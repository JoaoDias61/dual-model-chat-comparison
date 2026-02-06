from fastapi import APIRouter

from app.controllers import feedback_controller
from app.models.schemas import FeedbackRequest, FeedbackResponse

router = APIRouter(prefix="/api", tags=["feedback"])


@router.post("/feedback")
async def create_feedback(request: FeedbackRequest):
    return await feedback_controller.create_feedback(request)


@router.get("/feedbacks", response_model=list[FeedbackResponse])
async def get_feedbacks():
    return await feedback_controller.get_feedbacks()
