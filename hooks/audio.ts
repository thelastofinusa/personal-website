import * as React from "react";

export function useChatAudio() {
  const sentRef = React.useRef<HTMLAudioElement | null>(null);
  const recvRef = React.useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const sent = new Audio("/sent.mp3");
    const recv = new Audio("/received.mp3");

    let count = 0;
    const mark = () => {
      count += 1;
      if (count === 2) setReady(true);
    };

    sent.addEventListener("canplaythrough", mark, { once: true });
    recv.addEventListener("canplaythrough", mark, { once: true });

    sentRef.current = sent;
    recvRef.current = recv;

    return () => {
      sent.removeEventListener("canplaythrough", mark);
      recv.removeEventListener("canplaythrough", mark);
    };
  }, []);

  return { ready, sentRef, recvRef };
}
