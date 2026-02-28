# 🚀 Startup Hunter - Server Status

## ✅ Both Servers Running!

### Backend (Python FastAPI)
- **Status**: Running
- **URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Process ID**: Check with `ps aux | grep "python main.py"`
- **Logs**: `/Users/ewencheung/Documents/GitHub/Startup-Hunter/backend/backend.log`

### Frontend (Next.js)
- **Status**: Running
- **URL**: http://localhost:3000
- **Process ID**: Check with `ps aux | grep "npm run dev"`
- **Logs**: `/Users/ewencheung/Documents/GitHub/Startup-Hunter/app/frontend.log`

---

## Quick Test

**Test Backend API:**
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"fintech","stage":"input"}'
```

**Expected Response:**
```json
{
  "message": "Got it! I'll scan trends in the fintech space...",
  "stage": "trends",
  "embedType": "status",
  "embedData": {...}
}
```

---

## Access the Application

Open your browser and visit: **http://localhost:3000**

You should see the Startup Hunter chat interface!

---

## Stop Servers

**Kill all processes:**
```bash
pkill -f "python main.py"
pkill -f "npm run dev"
```

**Or use the startup script:**
```bash
# Ctrl+C will stop both servers if started with ./start.sh
```

---

## Troubleshooting

### Backend not responding
```bash
# Check logs
cat backend/backend.log

# Restart
cd backend
.venv/bin/python main.py
```

### Frontend not responding
```bash
# Check logs
cat app/frontend.log

# Restart
cd app
npm run dev
```

### Port already in use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## Integration Status

### ✅ Complete
- [x] FastAPI backend with all endpoints
- [x] Next.js frontend with full UI
- [x] Frontend → Backend communication working
- [x] Mock data flowing through entire stack

### 🚧 TODO (Add API Keys)
To enable real functionality, add these to `backend/.env`:

```bash
# Copy example file
cp backend/.env.example backend/.env

# Then edit and add your API keys:
BRIGHTDATA_API_TOKEN=your_token_here
ACONTEXT_API_KEY=your_key_here
ACONTEXT_PROJECT_ID=your_project_id_here
OPENAI_API_KEY=your_openai_key_here
```

**Integration Files Ready:**
- `backend/brightdata_integration.py` - Bright Data scraping
- `backend/acontext_integration.py` - Acontext memory
- `backend/actionbook_integration.py` - ActionBook browser automation

---

## Next Steps

1. **Test the demo flow**: Visit http://localhost:3000 and walk through:
   - Type a domain (e.g., "fintech")
   - Click through trends → ideas → proposal → build → test

2. **Add API keys** (optional): Edit `backend/.env` to enable real integrations

3. **Customize mock data** (optional): Edit `backend/main.py` MOCK_* constants

4. **Deploy** (when ready): Follow deployment guides in README.md

---

**Built with:**
- FastAPI (Python backend)
- Next.js 15 (React frontend)
- Bright Data MCP (trend scraping)
- Acontext (persistent memory)
- ActionBook (browser automation)
