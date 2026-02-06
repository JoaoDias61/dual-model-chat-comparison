from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.controllers.chat_controller import ALLOWED_MODELS, stream_openai
from app.models.schemas import ChatRequest

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat")
async def chat(request: ChatRequest):
    if request.model not in ALLOWED_MODELS:
        raise HTTPException(
            status_code=400,
            detail=f"Model must be one of: {ALLOWED_MODELS}",
        )

    return StreamingResponse(
        stream_openai(request.prompt, request.model),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
