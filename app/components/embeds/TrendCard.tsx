import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trend } from '@/lib/mock-data';

interface TrendCardProps {
  trend: Trend;
  onSelect: () => void;
}

export function TrendCard({ trend, onSelect }: TrendCardProps) {
  const getScoreLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 8) return 'high';
    if (score >= 6) return 'medium';
    return 'low';
  };

  const scoreLevel = getScoreLevel(trend.score);

  return (
    <Card className="p-6 border-2 hover:border-brand-blue transition-smooth rounded-sharp">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex-1">{trend.title}</h3>
        <Badge className={`score-badge score-${scoreLevel} ml-3`}>
          {trend.score.toFixed(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-sharp">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs text-gray-600">Momentum</div>
          <div className="text-lg font-bold text-brand-blue">{trend.momentum}</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-sharp">
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs text-gray-600">Pain</div>
          <div className="text-lg font-bold text-score-orange">{trend.pain}</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-sharp">
          <div className="text-2xl mb-1">🏢</div>
          <div className="text-xs text-gray-600">Competition</div>
          <div className="text-lg font-bold text-purple-600">{trend.competition}</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-sharp">
          <div className="text-2xl mb-1">⚙️</div>
          <div className="text-xs text-gray-600">Build</div>
          <div className="text-lg font-bold text-success-green">{trend.build}</div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Pain Points:</h4>
        <ul className="space-y-1">
          {trend.painPoints.map((point, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-brand-blue mr-2">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Evidence:</h4>
        <ul className="space-y-1">
          {trend.evidence.map((item, index) => (
            <li key={index} className="text-sm text-gray-600">
              <span className="text-brand-blue">→</span> {item}
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={onSelect}
        className="w-full bg-brand-blue hover:bg-blue-700 text-white rounded-sharp transition-smooth"
      >
        Select This Trend
      </Button>
    </Card>
  );
}
