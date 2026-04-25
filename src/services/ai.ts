import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyADDohkexBsk5-LQ5x2mmBRF5Qv97yYWUA";
const genAI = new GoogleGenerativeAI(API_KEY);

export interface AISong {
  title: string;
  artist: string;
  lyrics: string;
  note: string;
  spotifySearchQuery: string;
  yearningInsight: string;
}

function extractJson(text: string): string {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error("No JSON found in response");
  return text.slice(start, end + 1);
}

export async function getYearningRecommendation(mood: string): Promise<AISong> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are the "UP Yearning Society AI Curator", an expert in Filipino "hugot" culture, OPM (Original Pilipino Music), and indie music that captures yearning (pananabik, pangingulila, sinta).

User mood: "${mood}"

Find a song (OPM, indie, or international) that perfectly matches this mood. Respond ONLY with a valid JSON object — no markdown, no extra text:

{
  "title": "Song Title",
  "artist": "Artist Name",
  "lyrics": "A short impactful lyric line (max 100 chars)",
  "note": "IG Note snippet (max 60 chars, can include 1 emoji)",
  "spotifySearchQuery": "artist name song title",
  "yearningInsight": "A poetic 1-2 sentence reflection on this yearning"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = extractJson(text);
  return JSON.parse(json) as AISong;
}
