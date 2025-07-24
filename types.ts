export enum GameState {
  START = 'START',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR',
}

export interface Choice {
  text: string;
}

export interface Scene {
  description: string;
  imagePrompt: string;
  choices: Choice[];
  imageBase64: string;
}

export interface GeminiResponse {
  description: string;
  imagePrompt: string;
  choices: Choice[];
}

// New types for chat history
export interface Part {
  text: string;
}

export interface Content {
  role: 'user' | 'model';
  parts: Part[];
}

export type History = Content[];
