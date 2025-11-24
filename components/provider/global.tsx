"use client";

import React from "react";

import { MessageType } from "@/lib/messages";
import { ThemeProvider } from "./theme";

type AutioProps = {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isAudioReady: boolean;
  playAudio: (isAnonymous: boolean) => void;
};

interface GlobalContextProps extends AutioProps {
  suggestions: {
    isLoading: boolean;
    data: string[];
  };
  fetchSuggestions: (messages: MessageType[]) => void;
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(
  undefined,
);

function GlobalProvider(props: { children: React.ReactNode }) {
  //! -----------------------------------------------------
  //! Audio Setup
  //! -----------------------------------------------------
  const [isMuted, setIsMuted] = React.useState<boolean>(true);

  //* Load saved mute state on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("isMuted");
    if (saved !== null) {
      setIsMuted(saved === "true");
    }
  }, []);

  //* Save mute state on change
  React.useEffect(() => {
    localStorage.setItem("isMuted", String(isMuted));
  }, [isMuted]);

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
      if (isMuted) return;
      if (!userInteracted) return;

      const audio = isAnonymous
        ? sentAudioRef.current
        : receivedAudioRef.current;

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    },
    [isMuted, userInteracted],
  );

  //! -----------------------------------------------------
  //! Suggestion Setup
  //! -----------------------------------------------------
  const [suggestions, setSuggestions] = React.useState<
    GlobalContextProps["suggestions"]
  >({
    isLoading: false,
    data: [],
  });

  const fetchSuggestions = React.useCallback(
    async (messages: Array<MessageType>) => {
      try {
        setSuggestions((prev) => ({ ...prev, isLoading: true }));

        const list = messages
          .filter((m) => m.sender.from === "anonymous")
          .flatMap((m) =>
            m.content
              .filter((c) => c.type === "text")
              .map((c) => c.suggestion ?? c.message),
          );

        setSuggestions((prev) => ({ ...prev, data: list }));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setSuggestions((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [],
  );

  //! -----------------------------------------------------
  //! Context Value
  //! -----------------------------------------------------
  const contextValue = React.useMemo(
    () => ({
      //* Audio Values
      isMuted,
      setIsMuted,
      isAudioReady,
      playAudio,

      //* Suggestion value
      suggestions,
      fetchSuggestions,
    }),
    [fetchSuggestions, isAudioReady, isMuted, playAudio, suggestions],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {props.children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
