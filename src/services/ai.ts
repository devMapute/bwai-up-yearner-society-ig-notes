import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not defined. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export interface AISong {
  title: string;
  artist: string;
  lyrics: string;
  note: string;
  spotifySearchQuery: string;
  yearningInsight: string;
}

export async function getYearningRecommendation(mood: string): Promise<AISong> {
  if (!API_KEY) {
    throw new Error("API Key missing. Please check your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are the "UP Yearning Society AI Curator", an expert in Filipino "hugot" culture, OPM (Original Pilipino Music), and indie music that captures the essence of "yearning" (pananabik, pangingulila, sinta).
    
    User Mood/Input: "${mood}"
    
    Your task:
    1. Find a song (OPM, Indie, or International) that perfectly matches this mood.
    2. Provide a short, poetic insight about why this song matches the "thinking" or "domain" of this specific yearning.
    3. Generate a perfect Instagram Note snippet (max 60 characters) based on the song.
    
    Return ONLY a JSON object with the following structure:
    {
      "title": "Song Title",
      "artist": "Artist Name",
      "lyrics": "A short, impactful line from the lyrics",
      "note": "The IG Note snippet",
      "spotifySearchQuery": "artist song title",
      "yearningInsight": "A deep, 1-2 sentence reflection on this yearning"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonStr) as AISong;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}
