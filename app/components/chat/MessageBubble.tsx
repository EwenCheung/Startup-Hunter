import React from 'react';

interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  if (role === 'system') {
    return (
      <div className="message-system animate-fade-in-up my-2">
        {content}
      </div>
    );
  }

  if (role === 'user') {
    return (
      <div className="flex justify-end my-3 animate-fade-in-up">
        <div className="message-user">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start my-3 animate-fade-in-up">
      <div className="message-ai">
        {content}
      </div>
    </div>
  );
}
