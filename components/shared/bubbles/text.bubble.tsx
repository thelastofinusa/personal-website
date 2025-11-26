import React from "react";

interface Props {
  message: string;
}

export const TextBubble: React.FC<Props> = ({ message }) => {
  return (
    <pre className="font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
      {message}
    </pre>
  );
};
