import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Idea } from '@/lib/mock-data';

interface IdeaCardProps {
  idea: Idea;
  onLock: () => void;
}

export function IdeaCard({ idea, onLock }: IdeaCardProps) {
  return (
    <Card className="p-6 border-2 hover:border-brand-blue transition-smooth rounded-sharp">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 flex-1">{idea.title}</h3>
        {idea.recommended && (
          <Badge className="score-badge score-high ml-3">
            Recommended
          </Badge>
        )}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{idea.concept}</p>

      <div className="mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Target User:</h4>
        <p className="text-sm text-gray-600">{idea.targetUser}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Advantages:</h4>
        <ul className="space-y-1">
          {idea.advantages.map((advantage, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-success-green mr-2">✓</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="my-4" />

      <div className="acontext-box mb-4">
        <div className="flex items-start gap-2">
          <div className="text-xl">🧠</div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-brand-blue mb-1">
              Acontext Memory Reasoning:
            </h4>
            <p className="text-sm text-gray-700 italic">{idea.acontextReasoning}</p>
          </div>
        </div>
      </div>

      <Button
        onClick={onLock}
        className="w-full bg-brand-blue hover:bg-blue-700 text-white rounded-sharp transition-smooth"
      >
        Lock This Idea
      </Button>
    </Card>
  );
}
