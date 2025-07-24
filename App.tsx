import React, { useState, useCallback, useEffect } from 'react';
import { GameState, type Scene, type History } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import { getInitialScene, getNextScene } from './services/geminiService';
import LoadingIndicator from './components/LoadingIndicator';
import { WandIcon, VolumeIcon } from './components/icons';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [scene, setScene] = useState<Scene | null>(null);
  const [history, setHistory] = useState<History | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);

  // This effect handles any inconsistent state where we are in PLAYING mode without a scene.
  useEffect(() => {
    if (gameState === GameState.PLAYING && !scene) {
      setError('Scene data is missing. An unexpected error occurred.');
      setGameState(GameState.ERROR);
    }
  }, [gameState, scene]);

  const handleStartGame = useCallback(async (theme: string) => {
    setGameState(GameState.LOADING);
    setError(null);
    try {
      const { scene: initialScene, history: initialHistory } = await getInitialScene(theme);
      setScene(initialScene);
      setHistory(initialHistory);
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState(GameState.ERROR);
    }
  }, []);

  const handlePlayerChoice = useCallback(async (choice: string) => {
    if (!history) {
      setError('Chat history not found.');
      setGameState(GameState.ERROR);
      return;
    }
    setGameState(GameState.LOADING);
    setError(null);
    try {
      const { scene: nextScene, history: nextHistory } = await getNextScene(history, choice);
      setScene(nextScene);
      setHistory(nextHistory);
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while advancing the story.');
      setGameState(GameState.ERROR);
    }
  }, [history]);

  const handleRestart = () => {
    setGameState(GameState.START);
    setScene(null);
    setHistory(null);
    setError(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.START:
        return <StartScreen onStart={handleStartGame} />;
      case GameState.LOADING:
        return (
          <div className="text-center">
            <LoadingIndicator />
            <p className="text-lg text-indigo-300 mt-4 animate-pulse">Generating your adventure...</p>
          </div>
        );
      case GameState.PLAYING:
        // The useEffect hook will redirect to ERROR state if scene is null,
        // but as a fallback, we can show a loading indicator.
        if (scene) {
          return (
            <GameScreen
              scene={scene}
              onChoice={handlePlayerChoice}
              voiceEnabled={voiceEnabled}
            />
          );
        }
        return <LoadingIndicator />; // Show loading while waiting for state to resolve.
      case GameState.ERROR:
        return (
          <div className="text-center bg-red-900/50 p-6 rounded-lg border border-red-500">
            <h2 className="text-2xl font-bold text-red-300 mb-4">An Error Occurred</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Restart Adventure
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-500/50">
      <header className="w-full max-w-4xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-4">
          <WandIcon className="h-10 w-10 text-indigo-400"/>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Chaim's Adventure
          </h1>
          <button
            onClick={() => setVoiceEnabled(v => !v)}
            className="ml-4 p-2 rounded-full bg-gray-700/70 hover:bg-indigo-600 transition-colors"
            title="Toggle narration"
          >
            <VolumeIcon className="h-6 w-6 text-indigo-300" />
          </button>
        </div>
        <p className="text-gray-400 mt-2">Your dynamic, AI-powered text adventure</p>
      </header>
      <main className="w-full max-w-4xl mx-auto flex-grow flex items-center justify-center">
        {renderContent()}
      </main>
      <footer className="w-full max-w-4xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Powered by Google Gemini & Imagen. Each adventure is unique.</p>
      </footer>
    </div>
  );
};

export default App;
