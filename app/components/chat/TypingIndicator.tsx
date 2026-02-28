import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start my-3 animate-fade-in-up">
      <div className="message-ai flex items-center gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
      </div>
    </div>
  );
}
