import { GoogleGenAI } from "@google/genai";

export async function onRequestPost({ request, env }) {
    try {
        const { query } = await request.json();
        const geminiApiKey = env.GEMINI_API_KEY;
        const ai = new GoogleGenAI({
            apiKey: geminiApiKey
        });
        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: query,
        });
        let text = "";
        for await (const chunk of response) {
            console.log(chunk.text);
            text += chunk.text;
        }
        return new Response(JSON.stringify({ text: text }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ text: 'Internal Server Error: ' + err.message }), {
            headers: { "Content-Type": "application/json" },
        });
    }
}