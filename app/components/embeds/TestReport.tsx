import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { TestReport as TestReportType } from '@/lib/mock-data';
import Image from 'next/image';

interface TestReportProps {
  report: TestReportType;
}

export function TestReport({ report }: TestReportProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const allPassed = report.failed === 0;

  return (
    <>
      <Card className="p-6 border-2 border-success-green rounded-sharp">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Automated Test Report
            </h2>
            <p className="text-sm text-gray-600">
              Browser: {report.browser} • Execution Time: {report.executionTime}
            </p>
          </div>
          <Badge className={`score-badge ${allPassed ? 'score-high' : 'score-low'}`}>
            {allPassed ? '✅ All Passed' : `${report.failed} Failed`}
          </Badge>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-sharp">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-success-green">{report.passed}</div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">{report.failed}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          {report.steps.map((step, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-sharp hover:border-brand-blue transition-smooth"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">
                  {step.status === 'pass' ? '✅' : '❌'}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.name}
                  </h3>
                  <ul className="space-y-1 mb-3">
                    {step.checks.map((check, checkIndex) => (
                      <li key={checkIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="text-success-green mr-2">✓</span>
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedScreenshot(step.screenshot)}
                    className="border-brand-blue text-brand-blue hover:bg-blue-50 rounded-sharp"
                  >
                    View Screenshot
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allPassed && (
          <div className="mt-6 p-4 bg-success-green/10 border border-success-green rounded-sharp">
            <p className="text-success-green font-semibold text-center">
              🎉 All tests passed! MVP is ready for deployment.
            </p>
          </div>
        )}
      </Card>

      <Dialog open={!!selectedScreenshot} onOpenChange={() => setSelectedScreenshot(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Test Screenshot</DialogTitle>
          </DialogHeader>
          {selectedScreenshot && (
            <div className="relative w-full h-[600px] bg-gray-100 rounded-sharp overflow-hidden">
              <Image
                src={selectedScreenshot}
                alt="Test screenshot"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
