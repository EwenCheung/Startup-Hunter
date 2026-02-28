import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface BuildLog {
  timestamp: string;
  level: 'info' | 'success' | 'error';
  message: string;
}

interface BuildProgressProps {
  logs: BuildLog[];
  progress?: number;
}

export function BuildProgress({ logs, progress = 0 }: BuildProgressProps) {
  const [visibleLogs, setVisibleLogs] = useState<BuildLog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs(prev => [...prev, logs[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, logs]);

  // Calculate estimated time remaining (assuming 120 seconds total build time)
  const estimatedTimeRemaining = progress < 100 
    ? Math.ceil((120 * (100 - progress)) / 100) 
    : 0;

  return (
    <Card className="p-6 border-2 border-brand-blue rounded-sharp bg-gray-900">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-white inline">Building MVP</h3>
            {progress < 100 && estimatedTimeRemaining > 0 && (
              <span className="text-gray-400 text-sm ml-2">
                (~{estimatedTimeRemaining}s remaining)
              </span>
            )}
            {progress === 100 && (
              <span className="text-success-green text-sm ml-2">(Complete)</span>
            )}
          </div>
          <span className="text-success-green font-mono text-sm">
            {progress}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="bg-black rounded-sharp p-4 max-h-96 overflow-y-auto">
        <div className="space-y-1">
          {visibleLogs.map((log, index) => (
            <div
              key={index}
              className="terminal-log animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
              <span className={
                log.level === 'success' ? 'text-success-green' :
                log.level === 'error' ? 'text-red-500' :
                'text-blue-400'
              }>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {currentIndex >= logs.length && (
        <div className="mt-4 p-3 bg-success-green/10 border border-success-green rounded-sharp">
          <p className="text-success-green font-semibold text-center">
            ✅ Build complete! MVP is ready for testing.
          </p>
        </div>
      )}
    </Card>
  );
}
