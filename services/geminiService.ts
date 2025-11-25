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
    history: `「${activityTitle}」是深受遊客喜愛的熱門景點。這裡融合了現代與傳統的韓國文化特色，值得您細細品味。 (此為預設資訊，AI 連線受限)`
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
    // Determine Endpoint:
    // If running on localhost or file, use direct URL (might fail CORS).
    // If running on deployed site (Netlify), use the proxy path defined in netlify.toml to bypass CORS.
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
    const endpoint = isLocal 
        ? "https://api.perplexity.ai/chat/completions" 
        : "/api/perplexity/chat/completions";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a professional travel guide for South Korea. You must respond in Traditional Chinese (繁體中文). You must return strictly valid JSON."
          },
          {
            role: "user",
            content: `請針對「${activityTitle} (${location})」提供繁體中文的旅遊建議。
            請分析這個地點，並提供 JSON 格式的回應，包含以下欄位：
            1. tips: string[] (3個實用的旅遊貼士，例如穿著建議、最佳拍照點、避開人潮時間)
            2. mustEat: string[] (3個該地點或附近的必吃美食)
            3. history: string (1段關於該地點的簡短有趣故事或歷史背景，50字以內)
            
            Response must be raw JSON without markdown formatting. Example:
            {
              "tips": ["tip1", "tip2", "tip3"],
              "mustEat": ["food1", "food2", "food3"],
              "history": "story..."
            }`
          }
        ],
        model: "sonar-pro", 
        temperature: 0.2,
        return_citations: false
      })
    });

    if (!response.ok) {
        const errText = await response.text();
        console.error(`Perplexity API Error: ${response.status} ${errText}`);
        return getMockData(activityTitle);
    }

    const json = await response.json();
    const content = json.choices[0]?.message?.content;
    
    if (!content) throw new Error("No content returned from Perplexity");

    // Attempt to extract JSON from code blocks if present, or parse directly
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0].replace(/```json|```/g, '') : content;

    const data = JSON.parse(jsonString) as AIData;
    
    // Basic validation
    if(Array.isArray(data.tips) && Array.isArray(data.mustEat) && typeof data.history === 'string') {
        cache[cacheKey] = data;
        return data;
    } else {
        throw new Error("Invalid JSON structure received");
    }
  } catch (error) {
    console.error("AI Service Exception:", error);
    // Fallback to mock data on any error (network, auth, parsing)
    return getMockData(activityTitle); 
  }
}