import { NextRequest, NextResponse } from 'next/server';
import { MOCK_STATUS_MESSAGES } from '@/lib/mock-data';

const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000';

export async function POST(req: NextRequest) {
  const { message, stage, selectedTrendId: _selectedTrendId, selectedIdeaId: _selectedIdeaId } = await req.json();
  
  try {
    const response = await fetch(`${PYTHON_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, stage }),
    });
    
    if (!response.ok) {
      throw new Error(`Python API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (stage === 'input') {
      return NextResponse.json({
        aiMessage: data.message,
        nextStage: data.stage,
        statusMessages: MOCK_STATUS_MESSAGES,
        embed: data.embedData ? {
          type: data.embedType,
          data: data.embedData
        } : undefined
      });
    }
    
    return NextResponse.json({
      aiMessage: data.message,
      nextStage: data.stage,
      embed: data.embedData ? {
        type: data.embedType,
        data: data.embedData
      } : undefined
    });
  } catch (error) {
    console.error('Failed to call Python backend:', error);
    
    return NextResponse.json({
      aiMessage: "Sorry, I encountered an error. Make sure the Python backend is running (python backend/main.py)",
      nextStage: stage,
      error: true
    }, { status: 500 });
  }
}
