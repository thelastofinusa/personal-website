"use client";

import React from "react";

type AudioContextProps = {
  isAudioMuted: boolean;
  setIsAudioMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isAudioReady: boolean;
  playAudio: (isAnonymous: boolean) => void;
};

const AudioContext = React.createContext<AudioContextProps | undefined>(
  undefined,
);

function AudioProvider(props: { children: React.ReactNode }) {
  const [isAudioMuted, setIsAudioMuted] = React.useState<boolean>(true);

  //* Load saved mute state on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("isAudioMuted");
    if (saved !== null) {
      setIsAudioMuted(saved === "true");
    }
  }, []);

  //* Save mute state on change
  React.useEffect(() => {
    localStorage.setItem("isAudioMuted", String(isAudioMuted));
  }, [isAudioMuted]);

  const [isAudioReady, setIsAudioReady] = React.useState<boolean>(false);

  //* Audio refs
  const sentAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const receivedAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const [userInteracted, setUserInteracted] = React.useState(false);

  React.useEffect(() => {
    //* Create audio elements
    const sentAudio = new Audio("/audio/sent.mp3");
    const receivedAudio = new Audio("/audio/received.mp3");

    //* Preload audio
    sentAudio.preload = "auto";
    receivedAudio.preload = "auto";

    sentAudioRef.current = sentAudio;
    receivedAudioRef.current = receivedAudio;

    //* Wait for both to be ready
    let sentReady = false;
    let receivedReady = false;

    const checkReady = () => {
      if (sentReady && receivedReady) {
        setIsAudioReady(true);
      }
    };

    sentAudio.addEventListener("canplaythrough", () => {
      sentReady = true;
      checkReady();
    });

    receivedAudio.addEventListener("canplaythrough", () => {
      receivedReady = true;
      checkReady();
    });

    //* Fallback in case audio fails to load
    const timeout = setTimeout(() => {
      setIsAudioReady(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      sentAudio.pause();
      receivedAudio.pause();
    };
  }, []);

  //* Wait for first interaction
  React.useEffect(() => {
    const handler = () => {
      setUserInteracted(true);
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
    };

    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    window.addEventListener("touchstart", handler);

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, []);

  const playAudio = React.useCallback(
    (isAnonymous: boolean) => {
      if (isAudioMuted) return;
      if (!userInteracted) return;

      const audio = isAnonymous
        ? sentAudioRef.current
        : receivedAudioRef.current;

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    },
    [isAudioMuted, userInteracted],
  );

  const contextValue = React.useMemo(
    () => ({
      isAudioMuted,
      setIsAudioMuted,
      isAudioReady,
      playAudio,
    }),
    [isAudioReady, isAudioMuted, playAudio],
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {props.children}
    </AudioContext.Provider>
  );
}

function useAudioContext() {
  const context = React.useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudioContext must be used within a AudioProvider");
  }
  return context;
}

export { AudioProvider, useAudioContext };
