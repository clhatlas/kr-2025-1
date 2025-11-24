import { GoogleGenAI, Type } from "@google/genai";
import { AIData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Cache to store AI responses to save tokens and improve speed within session
const cache: Record<string, AIData> = {};

export async function fetchActivityInsights(activityTitle: string, location: string): Promise<AIData | null> {
  const cacheKey = `${activityTitle}-${location}`;
  if (cache[cacheKey]) return cache[cacheKey];

  if (!process.env.API_KEY) {
    console.warn("No API Key found. Returning mock data.");
    // Fallback/Mock data if no key is provided
    return {
        tips: ["請確保穿著保暖，韓國冬天非常寒冷。", "建議提前下載 Naver Map 方便導航。"],
        mustEat: ["魚板湯", "辣炒年糕", "韓式炸雞"],
        history: "此地點是韓國著名的旅遊勝地，擁有豐富的文化歷史背景。"
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `身為一位專業的韓國導遊，請針對「${activityTitle} (${location})」提供繁體中文的旅遊建議。
      請分析這個地點，並提供：
      1. 3個實用的旅遊貼士 (Tips)，例如穿著建議、最佳拍照點、避開人潮時間。
      2. 3個該地點或附近的必吃美食/必點菜單 (Must Eat)。
      3. 1段關於該地點的簡短有趣故事或歷史背景 (History, 50字以內)。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            mustEat: { type: Type.ARRAY, items: { type: Type.STRING } },
            history: { type: Type.STRING },
          },
          required: ["tips", "mustEat", "history"]
        }
      }
    });

    const text = response.text;
    if (text) {
      const data = JSON.parse(text) as AIData;
      cache[cacheKey] = data;
      return data;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
  return null;
}
