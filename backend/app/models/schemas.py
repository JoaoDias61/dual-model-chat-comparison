from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    prompt: str
    model: str


class FeedbackRequest(BaseModel):
    question: str
    response: str
    model: str
    rating: int = Field(ge=1, le=5)


class FeedbackResponse(BaseModel):
    id: int
    question: str
    response: str
    model: str
    rating: int
    created_at: str
