# RapidCanvas - Dual Model Chat Comparison

A full-stack application that lets users compare responses from two OpenAI models (GPT-3.5 Turbo and GPT-4o) side by side, with real-time streaming and a feedback/rating system.

## Features

- **Dual Model Streaming**: Send a prompt and receive responses from GPT-3.5 Turbo and GPT-4o simultaneously, streamed token-by-token in real time
- **Star Rating System**: Rate each model's response from 1 to 5 stars
- **Feedback Persistence**: Ratings are saved to a SQLite database along with the question and response
- **Evaluations Page**: Browse all saved feedback with model badges, star ratings, and timestamps
- **Sidebar Navigation**: Fixed sidebar for easy navigation between Chat and Evaluations pages

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Chakra UI v3** for component library and styling
- **React Router v7** for client-side routing
- **Vite** for build tooling and dev server

### Backend
- **Python** with **FastAPI**
- **OpenAI Python SDK** for LLM integration
- **SQLite** via **aiosqlite** for async database operations
- **SSE (Server-Sent Events)** for real-time streaming

## Project Structure

```
teste_rapidcanvas/
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI app, CORS, lifespan
│   │   ├── database.py                # SQLite connection and initialization
│   │   ├── models/
│   │   │   └── schemas.py             # Pydantic request/response models
│   │   ├── routes/
│   │   │   ├── chat.py                # POST /api/chat
│   │   │   └── feedback.py            # POST /api/feedback, GET /api/feedbacks
│   │   ├── controllers/
│   │   │   ├── chat_controller.py     # OpenAI streaming logic
│   │   │   └── feedback_controller.py # Feedback business logic
│   │   └── repositories/
│   │       └── feedback_repository.py # SQLite CRUD operations
│   ├── .env                           # OPENAI_API_KEY (not committed)
│   ├── .env.example                   # Environment template
│   └── requirements.txt               # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.tsx          # Textarea + submit button
│   │   │   ├── ResponseBox.tsx        # Model response display with rating
│   │   │   ├── ResponsePanel.tsx      # Side-by-side response boxes
│   │   │   ├── StarRating.tsx         # Interactive 1-5 star rating
│   │   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   │   ├── Layout.tsx             # Sidebar + content area wrapper
│   │   │   └── ui/provider.tsx        # Chakra UI provider
│   │   ├── hooks/
│   │   │   └── useStreamChat.ts       # SSE streaming custom hook
│   │   ├── pages/
│   │   │   ├── Chat.tsx               # Main chat comparison page
│   │   │   └── Evaluations.tsx        # Feedback history page
│   │   └── types/
│   │       └── index.ts              # TypeScript interfaces
│   ├── .env                           # VITE_API_URL (not committed)
│   ├── .env.example                   # Environment template
│   ├── tsconfig.json                  # TypeScript configuration
│   └── package.json                   # Dependencies and scripts
└── .gitignore
```

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 20+
- An OpenAI API key

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv env

# Activate (Windows)
.\env\Scripts\activate

# Activate (Linux/Mac)
source env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start the server
uvicorn app.main:app --reload --port 8000
```

The API documentation is available at http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Default: VITE_API_URL=http://127.0.0.1:8000

# Start dev server
npm run dev
```

Open http://localhost:5173 in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Stream a response from a specified model (SSE) |
| POST | `/api/feedback` | Save a feedback rating (1-5 stars) |
| GET | `/api/feedbacks` | Get all saved feedback, newest first |

### POST /api/chat
```json
{
  "prompt": "Explain quantum computing",
  "model": "gpt-4o"
}
```
Returns: `text/event-stream` with `data: <token>` events

### POST /api/feedback
```json
{
  "question": "Explain quantum computing",
  "response": "Quantum computing is...",
  "model": "gpt-4o",
  "rating": 5
}
```

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |

### Frontend (`frontend/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL (default: `http://127.0.0.1:8000`) |
