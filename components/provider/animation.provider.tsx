"use client";

import React from "react";

interface AnimationContextType {
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
  enableAnimation: () => void;
  disableAnimation: () => void;
  animationKey: number;
}

const AnimationContext = React.createContext<AnimationContextType | undefined>(
  undefined,
);

interface AnimationProviderProps {
  children: React.ReactNode;
  defaultEnabled?: boolean;
}

function AnimationProvider({
  children,
  defaultEnabled = false,
}: AnimationProviderProps) {
  const [isAnimationEnabled, setIsAnimationEnabled] =
    React.useState<boolean>(defaultEnabled);
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  const toggleAnimation = React.useCallback(() => {
    setIsAnimationEnabled((prev) => !prev);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const enableAnimation = React.useCallback(() => {
    setIsAnimationEnabled(true);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const disableAnimation = React.useCallback(() => {
    setIsAnimationEnabled(false);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const value = React.useMemo(
    () => ({
      isAnimationEnabled,
      toggleAnimation,
      enableAnimation,
      disableAnimation,
      animationKey,
    }),
    [
      isAnimationEnabled,
      toggleAnimation,
      enableAnimation,
      disableAnimation,
      animationKey,
    ],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

function useAnimation(): AnimationContextType {
  const context = React.useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}

export { AnimationProvider, useAnimation };
