import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function onRequestPost({ request, env }) {
    try {
        const { query } = await request.json();
        const geminiApiKey = env.GEMINI_API_KEY;

        const model = google('gemini-2.5-flash', {
          apiKey: geminiApiKey
        });

        const response = streamText({
          model: model,
          providerOptions: {
            google: {
              responseModalities: ['TEXT'],
              thinkingConfig: {
                thinkingBudget: 2048,
              },
            },
          },
          prompt: query,
        });

        return response.toTextStreamResponse({
          headers: {
            'Content-Type': 'text/event-stream',
          },
        });
    } catch (err) {
        return new Response(JSON.stringify({ text: 'Internal Server Error: ' + err.message }), {
            headers: { "Content-Type": "application/json" },
        });
    }
}