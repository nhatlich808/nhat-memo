import { GoogleGenAI } from "@google/genai";

export async function onSearchPost({ request, env }) {
    const { query } = await request.json();
    const geminiApiKey = env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({
        apiKey: geminiApiKey
    });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
    });
    return new Response(JSON.stringify({ textResponse: response.text }), {
        headers: { "Content-Type": "application/json" },
    });
}