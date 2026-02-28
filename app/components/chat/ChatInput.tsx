import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  disabled = false,
  placeholder = "Describe your startup interests or just say 'go'..." 
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-4xl mx-auto flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none border border-gray-300 rounded-sharp px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-brand-blue hover:bg-blue-700 text-white px-6 rounded-sharp transition-smooth"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
