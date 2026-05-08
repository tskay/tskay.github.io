
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_TEXT, IMAGEN_MODEL, SYSTEM_INSTRUCTION_STORY, INITIAL_GAME_PROMPT_PAYLOAD } from '../constants';
import type { StoryChoiceResponse } from '../types';

let genAIInstance: GoogleGenAI | null = null;

const getGenAIClient = (): GoogleGenAI => {
  if (!genAIInstance) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable not set.");
      throw new Error("API_KEY environment variable not set.");
    }
    genAIInstance = new GoogleGenAI({ apiKey });
  }
  return genAIInstance;
};

export const generateStoryAndChoices = async (currentStoryContext: string, playerChoice: string): Promise<StoryChoiceResponse> => {
  const ai = getGenAIClient();
  
  let promptContent;
  if (playerChoice === "N/A" && currentStoryContext === "This is the beginning of the adventure.") {
    promptContent = INITIAL_GAME_PROMPT_PAYLOAD.contents.parts[0].text;
  } else {
    promptContent = `Current situation: ${currentStoryContext}\nPlayer chose: ${playerChoice}\nGenerate the next part of the story and choices.`;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_TEXT,
        contents: { role: "user", parts: [{text: promptContent}] },
        config: {
            systemInstruction: SYSTEM_INSTRUCTION_STORY,
            responseMimeType: "application/json",
        }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr) as StoryChoiceResponse;
    if (!parsedData.story || !parsedData.choices) {
        throw new Error("Invalid response structure from Gemini API.");
    }
    return parsedData;

  } catch (error) {
    console.error("Error generating story from Gemini:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error generating story.";
    // Try to provide more specific error messages for common issues
    if (errorMessage.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
    }
    if (errorMessage.includes("quota")) {
        throw new Error("API quota exceeded. Please check your Google AI Studio account.");
    }
    throw new Error(`Failed to generate story: ${errorMessage}`);
  }
};

export const generateAdventureImage = async (storyExcerpt: string): Promise<string> => {
  const ai = getGenAIClient();
  const imagePrompt = `A digital art illustration for a text adventure game about UN SDG7 (Affordable and Clean Energy). The scene depicts: ${storyExcerpt.substring(0, Math.min(storyExcerpt.length, 150))}. Emphasize hope, innovation, and community action towards sustainable energy. Style: vibrant, detailed, slightly stylized, optimistic.`;

  try {
    const response = await ai.models.generateImages({
        model: IMAGEN_MODEL,
        prompt: imagePrompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image generated or invalid image data from Imagen API.");
    }
  } catch (error) {
    console.error("Error generating image from Imagen:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error generating image.";
     if (errorMessage.includes("API key not valid")) {
        throw new Error("Invalid API Key for Imagen. Please check your API_KEY environment variable.");
    }
    if (errorMessage.includes("quota")) {
        throw new Error("Imagen API quota exceeded. Please check your Google AI Studio account.");
    }
    throw new Error(`Failed to generate image: ${errorMessage}`);
  }
};
