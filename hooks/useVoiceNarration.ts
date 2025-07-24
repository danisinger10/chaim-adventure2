import { useEffect, useRef } from 'react';

/**
 * Hook to speak the provided text using the Web Speech API.
 * It cancels any ongoing speech before starting a new utterance
 * to ensure only the latest narration plays.
 */
export default function useVoiceNarration(text: string | null, enabled: boolean) {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!enabled || !text) {
      synthRef.current?.cancel();
      return;
    }

    synthRef.current = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    utteranceRef.current = utterance;

    synthRef.current.cancel();
    synthRef.current.speak(utterance);

    return () => {
      synthRef.current?.cancel();
    };
  }, [text, enabled]);
}
