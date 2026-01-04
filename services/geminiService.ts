
import { GoogleGenAI } from "@google/genai";
import { Location, MoodType, PlaceRecommendation } from "../types";

export const getPlaceRecommendations = async (
  mood: MoodType,
  location: Location
): Promise<{ text: string; links: { title: string; uri: string }[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const moodPromptMap: Record<MoodType, string> = {
    work: "quiet coffee shops or libraries with good wifi and laptop-friendly seating",
    date: "romantic restaurants or cozy bars with great atmosphere for a couple",
    quick_bite: "high-quality fast casual dining or street food with quick service",
    budget: "affordable but highly rated eateries and budget-friendly activities",
    hidden_gem: "underrated or less-known places that locals love but tourists miss",
    outdoor: "parks, scenic viewpoints, or restaurants with excellent outdoor seating"
  };

  const prompt = `I am looking for recommendations for a "${mood}" vibe. Specifically, find ${moodPromptMap[mood]} near my current location. 
  Please provide a list of 4-5 specific places. For each place, include:
  1. The name of the place
  2. A brief 1-2 sentence description of why it fits this mood
  3. Mention its general rating if available.
  Format the response clearly.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Maps grounding is best on 2.5 flash
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude
            }
          }
        }
      }
    });

    const text = response.text || "No recommendations found.";
    
    // Extract grounding chunks for links
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const links = chunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title || "View on Maps",
        uri: chunk.maps.uri
      }));

    return { text, links };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch smart recommendations. Please try again.");
  }
};
