import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProposalSection } from '@/lib/mock-data';

interface ProposalEmbedProps {
  sections: ProposalSection[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function ProposalEmbed({ sections, onEdit, onRegenerate }: ProposalEmbedProps) {
  return (
    <Card className="p-6 border-2 border-brand-blue rounded-sharp">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Startup Proposal
        </h2>
        <p className="text-sm text-gray-600">
          Comprehensive 10-section proposal generated from trend analysis
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`section-${index}`}>
            <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-brand-blue">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex gap-3 mt-6">
        {onEdit && (
          <Button
            onClick={onEdit}
            variant="outline"
            className="flex-1 border-brand-blue text-brand-blue hover:bg-blue-50 rounded-sharp transition-smooth"
          >
            Edit Proposal
          </Button>
        )}
        {onRegenerate && (
          <Button
            onClick={onRegenerate}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sharp transition-smooth"
          >
            Regenerate Section
          </Button>
        )}
      </div>
    </Card>
  );
}
