import { GoogleGenAI, Type } from "@google/genai";
import { AIData } from "../types";

// Cache to store AI responses
const cache: Record<string, AIData> = {};

// Helper to get mock data so the app looks functional even without a valid API key
const getMockData = (activityTitle: string): AIData => ({
    tips: [
        "建議穿著舒適好走的鞋子。", 
        "記得攜帶行動電源，隨時為手機充電。", 
        "可以使用 Naver Map 查詢最即時的交通資訊。"
    ],
    mustEat: [
        "韓式炸雞", 
        "辣炒年糕", 
        "街頭魚板串"
    ],
    history: `「${activityTitle}」是深受遊客喜愛的熱門景點。這裡融合了現代與傳統的韓國文化特色，值得您細細品味。(目前顯示離線資訊)`
});

export async function fetchActivityInsights(activityTitle: string, location: string): Promise<AIData | null> {
  const cacheKey = `${activityTitle}-${location}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const apiKey = process.env.API_KEY;

  // Check for missing or placeholder key
  if (!apiKey || apiKey.includes('__API_KEY__')) {
    console.warn("No valid API Key found. Returning mock data.");
    return getMockData(activityTitle);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `請針對「${activityTitle} (${location})」提供繁體中文的旅遊建議。
            請分析這個地點，並提供 JSON 格式的回應，包含以下欄位：
            1. tips: string[] (3個實用的旅遊貼士)
            2. mustEat: string[] (3個該地點或附近的必吃美食)
            3. history: string (1段關於該地點的簡短有趣故事或歷史背景，50字以內)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            mustEat: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            history: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    
    if (!text) throw new Error("No content returned from Gemini");

    const data = JSON.parse(text) as AIData;
    
    // Basic validation
    if(Array.isArray(data.tips) && Array.isArray(data.mustEat) && typeof data.history === 'string') {
        cache[cacheKey] = data;
        return data;
    } else {
        console.warn("Invalid JSON structure received", data);
        return getMockData(activityTitle);
    }
  } catch (error) {
    console.error("AI Service Exception:", error);
    // Fallback to mock data on any error
    return getMockData(activityTitle); 
  }
}