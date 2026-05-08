
export interface StoryChoiceResponse {
  story: string;
  choices: string[];
}

export interface GameState {
  currentStory: string;
  currentImageUrl: string | null;
  choices: string[];
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  apiKeyOk: boolean;
  gameStarted: boolean;
  isInitialLoad: boolean;
}
