import { GoogleGenAI } from "@google/genai";
import type { Scene, GeminiResponse, History, Content } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// The instructions for the AI, including the JSON structure, are now part of the prompt.
// This avoids using the `config` object which can cause issues with some network proxies.
const getPromptInstruction = (userRequest: string) => `You are an expert text-based adventure game master. Your goal is to create a dynamic, engaging, and imaginative story for a player named Chaim.
- The player character's name is ALWAYS Chaim. Refer to the player as Chaim in the story.
- Your entire response MUST be a single, valid JSON object and nothing else. Do not wrap it in markdown.

The JSON object must have this exact structure:
{
  "description": "A detailed, immersive description of the current scene, formatted as 2-3 short paragraphs separated by a newline character ('\\n'). Write in the second person about 'Chaim' (e.g., 'You see...'). Wrap key nouns (items, characters, locations) in markdown bold (e.g., **the ancient sword**) to highlight them.",
  "imagePrompt": "A concise, descriptive prompt for an image generator that includes Chaim. Focus on key visual elements: subject (Chaim), setting, mood, and style (e.g., 'cinematic, dark fantasy, Chaim stands before a glowing portal in a crumbling ruin').",
  "choices": [
    { "text": "A short, actionable phrase for the first choice." },
    { "text": "A short, actionable phrase for the second choice." },
    { "text": "A short, actionable phrase for a third choice." }
  ]
}

Now, fulfill this request for Chaim:
${userRequest}`;


async function generateImage(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: `${prompt}, cinematic lighting, fantasy art, epic, highly detailed`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });
        
        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("Image generation failed, no images returned.");
        }

        return response.generatedImages[0].image.imageBytes;
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate scene image.");
    }
}

function parseGeminiResponse(responseText: string): GeminiResponse {
    if (!responseText) {
        throw new Error("Gemini returned an empty response.");
    }

    try {
        // AI can sometimes wrap the JSON in markdown, so we clean it up.
        const cleanJson = responseText.replace(/^```json/, '').replace(/```$/, '').trim();
        const parsed = JSON.parse(cleanJson);
        // Basic validation
        if (!parsed.description || !parsed.imagePrompt || !Array.isArray(parsed.choices)) {
             throw new Error("Invalid JSON structure from Gemini.");
        }
        return parsed as GeminiResponse;
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", responseText);
        throw new Error("The story took an unexpected turn. The format of the response was unreadable.");
    }
}


export async function getInitialScene(theme: string): Promise<{ scene: Scene; history: History }> {
    const userMessage = `Start a new adventure for Chaim with the theme: "${theme}"`;
    const fullPrompt = getPromptInstruction(userMessage);
    
    // API call is now extremely simple, with all instructions in the prompt.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });

    const geminiResponse = parseGeminiResponse(response.text);
    const imageBase64 = await generateImage(geminiResponse.imagePrompt);

    const userContent: Content = { role: 'user', parts: [{ text: userMessage }] };
    const modelContent: Content = { role: 'model', parts: [{ text: response.text }] };

    const newHistory: History = [userContent, modelContent];

    return {
        scene: { ...geminiResponse, imageBase64 },
        history: newHistory,
    };
}


export async function getNextScene(history: History, choice: string): Promise<{ scene: Scene, history: History }> {
    let storyContext = "";
    if (history.length > 0) {
        const lastModelTurn = history[history.length - 1];
        if (lastModelTurn && lastModelTurn.role === 'model') {
            try {
                // The model's last output was the JSON for the previous scene.
                const lastResponse = parseGeminiResponse(lastModelTurn.parts[0].text);
                storyContext = `The story so far: ${lastResponse.description}\n\n`;
            } catch (e) {
                console.warn("Could not parse last model turn for context.", e);
                storyContext = ""; 
            }
        }
    }

    const userRequest = `${storyContext}Chaim's next action is: "${choice}". What happens now?`;
    const fullPrompt = getPromptInstruction(userRequest);

    // API call is now extremely simple, with all instructions in the prompt.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });

    const geminiResponse = parseGeminiResponse(response.text);
    const imageBase64 = await generateImage(geminiResponse.imagePrompt);

    const newHistory: History = [
        ...history,
        { role: 'user', parts: [{ text: `Chaim chose: "${choice}"` }] },
        { role: 'model', parts: [{ text: response.text }] }
    ];

    return {
        scene: { ...geminiResponse, imageBase64 },
        history: newHistory
    };
}
