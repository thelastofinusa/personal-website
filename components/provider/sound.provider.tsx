"use client";

import * as React from "react";

interface SoundContextProps {
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = React.createContext<SoundContextProps | undefined>(
  undefined,
);

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMuted, setIsMuted] = React.useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("sound-muted");
    return saved ? saved === "true" : true;
  });

  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem("sound-muted", String(next));
      return next;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = React.useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
