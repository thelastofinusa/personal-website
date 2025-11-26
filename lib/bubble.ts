import { MessageContentType } from "./types";

//! ============================================
//! ANIMATION SPEED CONFIGURATION
//! Adjust this multiplier to control overall animation speed
//! 1.0 = normal speed
//! 2.0 = twice as slow
//! 0.5 = twice as fast
//! ============================================
const ANIMATION_SPEED_MULTIPLIER = 1.5;

//! Base timing configuration (in milliseconds)
const TIMING = {
  // Typing indicator durations
  typingMin: 600 * ANIMATION_SPEED_MULTIPLIER,
  typingMax: 800 * ANIMATION_SPEED_MULTIPLIER,
  typingBase: 400 * ANIMATION_SPEED_MULTIPLIER,
  typingPerChar: 10 * ANIMATION_SPEED_MULTIPLIER,

  // Content display durations
  contentMin: 500 * ANIMATION_SPEED_MULTIPLIER,
  contentMax: 1000 * ANIMATION_SPEED_MULTIPLIER,
  contentBase: 400 * ANIMATION_SPEED_MULTIPLIER,
  contentPerChar: 8 * ANIMATION_SPEED_MULTIPLIER,

  // Delay before next message
  nextMessageMin: 400 * ANIMATION_SPEED_MULTIPLIER,
  nextMessageMax: 1000 * ANIMATION_SPEED_MULTIPLIER,
  nextMessageBase: 300 * ANIMATION_SPEED_MULTIPLIER,
  nextMessagePerChar: 5 * ANIMATION_SPEED_MULTIPLIER,
};

function getContentLength(content: MessageContentType): number {
  if (content.message && content.message.length > 0) {
    return content.message.length;
  }
  return 80; // default for non-text content
}

//! Helper function to calculate typing delay
function getTypingDelay(contentLength: number): number {
  return Math.min(
    TIMING.typingMax,
    Math.max(
      TIMING.typingMin,
      TIMING.typingBase + contentLength * TIMING.typingPerChar,
    ),
  );
}

//! Helper function to calculate content display delay
function getContentDelay(contentLength: number): number {
  return Math.min(
    TIMING.contentMax,
    Math.max(
      TIMING.contentMin,
      TIMING.contentBase + contentLength * TIMING.contentPerChar,
    ),
  );
}

//! Helper function to calculate next message delay
function getNextMessageDelay(contentLength: number): number {
  return Math.min(
    TIMING.nextMessageMax,
    Math.max(
      TIMING.nextMessageMin,
      TIMING.nextMessageBase + contentLength * TIMING.nextMessagePerChar,
    ),
  );
}

export {
  ANIMATION_SPEED_MULTIPLIER,
  TIMING,
  getContentLength,
  getTypingDelay,
  getContentDelay,
  getNextMessageDelay,
};
