
import React, { useState, useEffect, useCallback } from 'react';
import { StoryDisplay } from './components/StoryDisplay';
import { Choices } from './components/Choices';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Attribution } from './components/Attribution';
import { generateStoryAndChoices, generateAdventureImage } from './services/geminiService';
import type { GameState, StoryChoiceResponse } from './types';
import { APP_TITLE, INITIAL_GAME_PROMPT_PAYLOAD } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStory: "",
    currentImageUrl: null,
    choices: [],
    isLoading: false,
    loadingMessage: "Initializing Adventure...",
    error: null,
    apiKeyOk: false, // Will be checked on mount
    gameStarted: false,
    isInitialLoad: true,
  });

  useEffect(() => {
    document.title = APP_TITLE;
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setGameState(prev => ({ 
        ...prev, 
        apiKeyOk: false, 
        error: "CRITICAL: API_KEY is not configured. Please set the API_KEY environment variable. The application cannot function without it.",
        isLoading: false,
        isInitialLoad: false,
      }));
    } else {
      setGameState(prev => ({ ...prev, apiKeyOk: true, isInitialLoad: false })); // API key seems present, game can start
    }
  }, []);

  const fetchNewScene = useCallback(async (storyContext: string, playerChoice: string) => {
    if (!gameState.apiKeyOk) {
      setGameState(prev => ({ ...prev, error: "API Key not available. Cannot proceed.", isLoading: false }));
      return;
    }

    setGameState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null, 
        loadingMessage: playerChoice === "N/A" ? "Crafting your initial adventure..." : "The story unfolds..." 
    }));

    try {
      const storyResponse: StoryChoiceResponse = await generateStoryAndChoices(storyContext, playerChoice);
      setGameState(prev => ({
        ...prev,
        currentStory: storyResponse.story,
        choices: storyResponse.choices,
        currentImageUrl: null, // Clear previous image
        loadingMessage: "Visualizing the scene...",
      }));

      // Generate image based on the new story
      if (storyResponse.story) {
        const imageUrl = await generateAdventureImage(storyResponse.story);
        setGameState(prev => ({
          ...prev,
          currentImageUrl: imageUrl,
          isLoading: false,
          gameStarted: true,
          isInitialLoad: false,
        }));
      } else {
         setGameState(prev => ({ ...prev, isLoading: false, gameStarted: true, isInitialLoad: false }));
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Error during scene generation:", err);
      setGameState(prev => ({
        ...prev,
        isLoading: false,
        error: `Adventure Interrupted: ${errorMessage}`,
        isInitialLoad: false,
      }));
    }
  }, [gameState.apiKeyOk]);


  const handleStartGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      isInitialLoad: true, // Mark as initial load for the first scene
      currentStory: "", // Clear any previous story
      choices: [],
      currentImageUrl: null
    }));
    // Use the constants for initial prompt context
    fetchNewScene(INITIAL_GAME_PROMPT_PAYLOAD.contents.parts[0].text.split("Player chose:")[0].replace("Current situation:", "").trim(), "N/A");
  };
  
  const handleChoiceSelected = (choice: string) => {
    fetchNewScene(gameState.currentStory, choice);
  };

  if (!gameState.apiKeyOk && gameState.error) {
    return (
      <div className="min-h-screen bg-slate-900 text-red-400 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Configuration Error</h1>
        <p className="text-lg">{gameState.error}</p>
        <p className="mt-4 text-sm text-slate-400">This application requires a valid Google Gemini API Key to be configured in the environment variables.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100 flex flex-col">
      {gameState.isLoading && <LoadingSpinner message={gameState.loadingMessage} />}
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            {APP_TITLE}
          </h1>
        </header>

        {gameState.error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{gameState.error}</span>
          </div>
        )}

        {!gameState.gameStarted && gameState.apiKeyOk && !gameState.isLoading && (
          <div className="text-center p-8 bg-slate-800 shadow-2xl rounded-xl">
            <h2 className="text-3xl font-semibold mb-6 text-sky-300">Welcome, Innovator!</h2>
            <p className="text-lg mb-8 text-slate-300 max-w-xl mx-auto">
              Embark on a journey to explore challenges and triumphs in achieving UN Sustainable Development Goal 7: Affordable and Clean Energy for all. Your choices will shape the story.
            </p>
            <button
              onClick={handleStartGame}
              disabled={gameState.isLoading || !gameState.apiKeyOk}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 text-xl focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Your Adventure
            </button>
          </div>
        )}

        {gameState.gameStarted && (
          <div className="max-w-3xl mx-auto">
            <StoryDisplay 
                story={gameState.currentStory} 
                imageUrl={gameState.currentImageUrl}
                isInitialLoad={gameState.isInitialLoad && !gameState.currentStory} 
            />
            {!gameState.isLoading && gameState.choices.length > 0 && (
              <Choices 
                choices={gameState.choices} 
                onChoiceSelected={handleChoiceSelected} 
                disabled={gameState.isLoading} 
              />
            )}
          </div>
        )}
      </main>
      
      <Attribution />
    </div>
  );
};

export default App;
