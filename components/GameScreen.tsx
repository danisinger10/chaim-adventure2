import React from 'react';
import type { Scene } from '../types';
import { SwordIcon, ChevronRightIcon } from './icons';

interface GameScreenProps {
  scene: Scene;
  onChoice: (choice: string) => void;
}

// A simple component to parse and render markdown-style bolding
const FormattedText: React.FC<{ text: string; className?: string; style?: React.CSSProperties }> = ({ text, className, style }) => {
  const parts = text.split('**');
  return (
    <p className={className} style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-indigo-300">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  );
};

const GameScreen: React.FC<GameScreenProps> = ({ scene, onChoice }) => {
  // Split description into paragraphs, filtering out empty lines
  const paragraphs = scene.description.split('\n').filter(p => p.trim());

  return (
    <div className="w-full max-w-4xl p-4 md:p-6 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm animate-fade-in-screen">
      <div className="aspect-w-16 aspect-h-9 mb-6">
         <img
          key={scene.imageBase64} /* Force re-render on new image */
          src={`data:image/jpeg;base64,${scene.imageBase64}`}
          alt={scene.imagePrompt}
          className="w-full h-full object-cover rounded-xl border-2 border-gray-700 shadow-lg animate-fade-in"
        />
      </div>
      
      <div className="mb-6 space-y-4">
        {paragraphs.map((paragraph, index) => (
            <FormattedText
              key={index}
              text={paragraph}
              className="text-gray-300 leading-relaxed font-serif text-lg animate-text-fade"
              style={{ animationDelay: `${index * 250}ms` }}
            />
          ))}
      </div>

      <div>
        <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2 animate-text-fade" style={{ animationDelay: `${paragraphs.length * 250}ms` }}>
          <SwordIcon className="h-6 w-6" />
          What do you do?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onChoice(choice.text)}
              className="w-full text-left px-5 py-3 bg-gray-700/80 text-gray-200 font-semibold rounded-lg hover:bg-indigo-600/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transform hover:translate-y-[-2px] transition-all duration-200 flex items-center justify-between animate-choice-fade"
              style={{ animationDelay: `${paragraphs.length * 250 + 100 + index * 100}ms` }}
            >
              <span>{choice.text}</span>
              <ChevronRightIcon className="h-5 w-5 opacity-70" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes screenFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-screen {
    animation: screenFadeIn 0.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }

  @keyframes textFade {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-text-fade, .animate-choice-fade {
    opacity: 0; /* Start hidden to be faded in */
    animation: textFade 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default GameScreen;