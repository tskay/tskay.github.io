
export const GEMINI_MODEL_TEXT = "gemini-2.5-flash-preview-04-17";
export const IMAGEN_MODEL = "imagen-3.0-generate-002";

export const SYSTEM_INSTRUCTION_STORY = `You are a text adventure game master. Your stories revolve around the UN's Sustainable Development Goal 7: Affordable and Clean Energy. The player is an innovator or community member working to implement or benefit from clean energy solutions. Keep the tone engaging, educational, and hopeful, while also realistically portraying challenges. The story should naturally progress towards promoting affordable and clean energy.

The response MUST be a valid JSON object with the following structure:
{
  "story": "The narrative of the current scene, focusing on clean energy themes and challenges. Around 100-150 words.",
  "choices": ["Actionable choice 1 leading to a consequence (concise, max 15 words)", "Actionable choice 2 leading to a different consequence (concise, max 15 words)", "Actionable choice 3 (optional, concise, max 15 words)"]
}
Ensure choices are distinct and lead to meaningful progression in the SDG7 context. Focus on positive framing and solutions.`;

export const INITIAL_GAME_PROMPT_PAYLOAD = {
  contents: {
    role: "user",
    parts: [{text: `Current situation: This is the beginning of the adventure. Player chose: N/A. Generate the initial story and choices.`}]
  },
  config: {
    systemInstruction: SYSTEM_INSTRUCTION_STORY,
    responseMimeType: "application/json",
  }
};

export const SDG7_PORTAL_URL = "https://www.un.org/sustainabledevelopment/energy/";
export const APP_TITLE = "Energy Quest: An SDG7 Adventure";
