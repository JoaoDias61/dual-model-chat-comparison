from app.models.schemas import FeedbackRequest, FeedbackResponse
from app.repositories import feedback_repository


async def create_feedback(request: FeedbackRequest) -> dict:
    return await feedback_repository.insert_feedback(request)


async def get_feedbacks() -> list[FeedbackResponse]:
    return await feedback_repository.select_all_feedbacks()
