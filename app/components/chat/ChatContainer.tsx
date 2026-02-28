import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatContainerProps {
  children: React.ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <ScrollArea className="flex-1 px-4 py-6">
      <div className="max-w-4xl mx-auto" ref={scrollRef}>
        {children}
      </div>
    </ScrollArea>
  );
}
