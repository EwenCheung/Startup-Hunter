#!/bin/bash

echo "🚀 Starting Startup Hunter..."
echo ""

if [ ! -d "../backend/.venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd ../backend && python3 -m venv .venv
    echo "✅ Virtual environment created"
fi

echo "📦 Installing Python dependencies..."
cd ../backend
source .venv/bin/activate
pip install -q -r requirements.txt
echo "✅ Python dependencies installed"
echo ""

echo "🐍 Starting Python backend (port 8000)..."
python main.py &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

echo "⏳ Waiting for backend to be ready..."
sleep 2
echo ""

cd ../app
echo "⚛️  Starting Next.js frontend (port 3000)..."
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "========================================"
echo "🎉 Startup Hunter is ready!"
echo "========================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

wait
