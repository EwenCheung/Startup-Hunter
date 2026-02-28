'use client';

import React from 'react';
import { ChatProvider, useChatContext } from '@/lib/chat-context';
import { Header } from '@/components/chat/Header';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatInput } from '@/components/chat/ChatInput';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { TrendCard } from '@/components/embeds/TrendCard';
import { IdeaCard } from '@/components/embeds/IdeaCard';
import { ProposalEmbed } from '@/components/embeds/ProposalEmbed';
import { BuildProgress, type BuildLog } from '@/components/embeds/BuildProgress';
import { TestReport } from '@/components/embeds/TestReport';
import {
  MOCK_TRENDS,
  MOCK_IDEAS,
  MOCK_PROPOSAL,
  MOCK_TEST_REPORT,
  MOCK_BUILD_LOGS,
  MOCK_STATUS_MESSAGES,
  type Trend,
  type Idea,
  type ProposalSection,
  type TestReport as TestReportType,
} from '@/lib/mock-data';

function ChatInterface() {
  const {
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
  } = useChatContext();

  const handleSend = async (message: string) => {
    addMessage({ role: 'user', content: message });
    setTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (stage === 'input') {
      addMessage({
        role: 'system',
        content: '🔍 Starting trend analysis...',
      });

      for (const statusMsg of MOCK_STATUS_MESSAGES) {
        await new Promise((resolve) => setTimeout(resolve, statusMsg.delay));
        addMessage({
          role: 'system',
          content: `${statusMsg.icon} ${statusMsg.text}`,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      addMessage({
        role: 'assistant',
        content: 'I analyzed 200+ data points across Product Hunt, GitHub, Reddit, and Hacker News. Here are the top 5 opportunities:',
        embed: {
          type: 'trends',
          data: MOCK_TRENDS,
        },
      });

      setStage('trends');
      setTyping(false);
    }
  };

  const handleTrendSelect = async (trendId: number) => {
    selectTrend(trendId);
    setTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    addMessage({
      role: 'assistant',
      content: 'Great choice! I generated 5 startup ideas based on this trend:',
      embed: {
        type: 'ideas',
        data: MOCK_IDEAS,
      },
    });

    setStage('ideas');
    setTyping(false);
  };

  const handleIdeaLock = async (ideaId: number) => {
    selectIdea(ideaId);
    setTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    addMessage({
      role: 'assistant',
      content: 'Excellent! I created a comprehensive 10-section proposal for your startup:',
      embed: {
        type: 'proposal',
        data: MOCK_PROPOSAL,
      },
    });

    setStage('proposal');
    setTyping(false);
  };

  const handleBuildMVP = async () => {
    addMessage({ role: 'user', content: 'Build the MVP' });
    setTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    addMessage({
      role: 'assistant',
      content: 'Building your MVP now...',
      embed: {
        type: 'build-progress',
        data: { logs: MOCK_BUILD_LOGS, progress: 100 },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setStage('build');
    setTyping(false);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    addMessage({ role: 'user', content: 'Run automated tests' });
    setTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    addMessage({
      role: 'assistant',
      content: 'All tests passed! Here is your test report:',
      embed: {
        type: 'test-report',
        data: MOCK_TEST_REPORT,
      },
    });

    setStage('test');
    setTyping(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ChatContainer>
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
            {message.embed && message.embed.type === 'trends' && (
              <div className="grid gap-4 mt-4 mb-6">
                {(message.embed.data as Trend[]).map((trend) => (
                  <TrendCard
                    key={trend.id}
                    trend={trend}
                    onSelect={() => handleTrendSelect(trend.id)}
                  />
                ))}
              </div>
            )}
            {message.embed && message.embed.type === 'ideas' && (
              <div className="grid gap-4 mt-4 mb-6">
                {(message.embed.data as Idea[]).map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onLock={() => handleIdeaLock(idea.id)}
                  />
                ))}
              </div>
            )}
            {message.embed && message.embed.type === 'proposal' && (
              <div className="mt-4 mb-6">
                <ProposalEmbed
                  sections={message.embed.data as ProposalSection[]}
                  onEdit={() => console.log('Edit proposal')}
                  onRegenerate={() => console.log('Regenerate section')}
                />
                <button
                  onClick={handleBuildMVP}
                  className="mt-4 w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-sharp transition-smooth"
                >
                  Build MVP
                </button>
              </div>
            )}
            {message.embed && message.embed.type === 'build-progress' && (
              <div className="mt-4 mb-6">
                <BuildProgress
                  logs={(message.embed.data as { logs: BuildLog[]; progress: number }).logs}
                  progress={(message.embed.data as { logs: BuildLog[]; progress: number }).progress}
                />
              </div>
            )}
            {message.embed && message.embed.type === 'test-report' && (
              <div className="mt-4 mb-6">
                <TestReport report={message.embed.data as TestReportType} />
              </div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </ChatContainer>
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}

export default function Home() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}
