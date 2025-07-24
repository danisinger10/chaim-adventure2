import { useEffect, useRef } from 'react';

/**
 * Hook to speak the provided text using the Web Speech API.
 * It cancels any ongoing speech before starting a new utterance
 * to ensure only the latest narration plays.
 */
export default function useVoiceNarration(text: string | null, enabled: boolean) {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const lastTextRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !text) {
      synthRef.current?.cancel();
      lastTextRef.current = null;
      return;
    }

    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      return;
    }

    if (lastTextRef.current === text) {
      return;
    }

    synthRef.current = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    synthRef.current.cancel();
    synthRef.current.speak(utterance);
    lastTextRef.current = text;

    return () => {
      synthRef.current?.cancel();
    };
  }, [text, enabled]);
}

