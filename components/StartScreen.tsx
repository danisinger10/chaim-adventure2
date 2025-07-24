import React, { useState } from 'react';
import { QuillIcon } from './icons';

interface StartScreenProps {
  onStart: (theme: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [theme, setTheme] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('A haunted mansion on a stormy night...');
  
  const suggestions = [
    "Chaim's quest to find his focus-enhancing elixir",
    "Chaim launches an ambitious new division for his friend's training empire",
    'Chaim, the cyberpunk detective in a rain-slicked city',
    "Chaim's fantasy quest for a lost artifact",
    'Chaim, the space explorer on an alien planet',
  ];

  const handleStart = () => {
    if (theme.trim()) {
      onStart(theme);
    } else {
      onStart(placeholder);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTheme(suggestion);
    onStart(suggestion);
  }

  return (
    <div className="w-full max-w-xl text-center p-8 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <QuillIcon className="h-16 w-16 mx-auto mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white mb-2">Begin Your Adventure, Chaim</h2>
      <p className="text-gray-400 mb-6">Describe the world you want to explore, or choose a suggestion below.</p>
      
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
        <button
          onClick={handleStart}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transform hover:scale-105 transition-transform"
        >
          Start Adventure
        </button>
      </div>
      
      <div className="mt-8">
        <p className="text-gray-500 text-sm mb-3">Or try one of these:</p>
        <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((s, i) => (
                <button 
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-1.5 bg-gray-700/80 text-gray-300 text-sm rounded-full hover:bg-indigo-500/50 hover:text-white transition-colors"
                >
                    {s}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
