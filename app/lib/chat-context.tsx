'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Stage = 'input' | 'trends' | 'ideas' | 'proposal' | 'build' | 'test';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  embed?: EmbedData;
}

export interface EmbedData {
  type: 'trends' | 'ideas' | 'proposal' | 'build-progress' | 'test-report';
  data: unknown;
}

interface ChatContextType {
  messages: Message[];
  stage: Stage;
  selectedTrendId: number | null;
  selectedIdeaId: number | null;
  isTyping: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setStage: (stage: Stage) => void;
  selectTrend: (id: number) => void;
  selectIdea: (id: number) => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<Stage>('input');
  const [selectedTrendId, setSelectedTrendId] = useState<number | null>(null);
  const [selectedIdeaId, setSelectedIdeaId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const selectTrend = (id: number) => {
    setSelectedTrendId(id);
    addMessage({
      role: 'user',
      content: `I choose trend #${id}`,
    });
  };

  const selectIdea = (id: number) => {
    setSelectedIdeaId(id);
    addMessage({
      role: 'user',
      content: `I want to build this idea`,
    });
  };

  const setTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  const clearMessages = () => {
    setMessages([]);
    setStage('input');
    setSelectedTrendId(null);
    setSelectedIdeaId(null);
    setIsTyping(false);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        stage,
        selectedTrendId,
        selectedIdeaId,
        isTyping,
        addMessage,
        setStage,
        selectTrend,
        selectIdea,
        setTyping,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
