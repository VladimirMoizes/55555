// src/types/global.d.ts
export {};

declare global {
  interface Window {
    __audioManager: {
      audio: HTMLAudioElement | null;
      isSoundOn: boolean;
      isInitialized: boolean;
      getSoundStateFromStorage(): boolean;
      setSoundStateToStorage(value: boolean): void;
      getAudioTimeFromStorage(): number | null;
      setAudioTimeToStorage(value: number): void;
      init(): void;
      toggle(): void;
      getState(): boolean;
      update(): void;
      resume(): void;
      forcePlay(): void;
    };
  }
}