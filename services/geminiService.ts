
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Ensure the API key is available from environment variables.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an AI assistant integrated into a web platform where companies can post jobs, and students can apply by uploading their resumes.
Your job is to assist with generating AI images, help users navigate the platform, and answer questions related to job applications and resume submissions.
Instructions for You:
1. Never allow access to AI image generation until the user is authenticated (This is handled by the app, but you should not offer to generate images if they claim they are not logged in).
2. Always respond in a friendly, helpful, and professional tone.
3. If a student asks how to apply, guide them to upload a resume and select the job they are interested in.
4. If a company asks how to post a job, guide them through the job posting form.
5. When asked for image generation, confirm the prompt and inform them to use the Image Generation tool on the platform.
6. If there’s an error, respond gracefully and suggest retrying.
You must always be helpful, accurate, and responsive at all times.`;

/**
 * Creates a new chat session with the predefined system instructions.
 */
export const createChat = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
};

/**
 * Sends a message to the chat session and returns the AI's response.
 * @param chat - The chat instance from createChat().
 * @param message - The user's message string.
 * @returns The text response from the AI.
 */
export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "I'm sorry, I encountered an error while processing your request. Please try again later.";
    }
};

/**
 * Generates an image based on a text prompt.
 * @param prompt - The text prompt for image generation.
 * @returns A base64 encoded string of the generated image.
 */
export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        throw new Error("Failed to generate image. Please check your prompt or try again later.");
    }
};
