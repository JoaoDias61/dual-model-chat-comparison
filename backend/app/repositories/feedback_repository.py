from datetime import datetime, timezone

from app.database import get_db
from app.models.schemas import FeedbackRequest, FeedbackResponse


async def insert_feedback(feedback: FeedbackRequest) -> dict:
    db = await get_db()
    try:
        await db.execute(
            "INSERT INTO feedbacks (question, response, model, rating, created_at) VALUES (?, ?, ?, ?, ?)",
            (
                feedback.question,
                feedback.response,
                feedback.model,
                feedback.rating,
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        await db.commit()
        return {"message": "Feedback saved"}
    finally:
        await db.close()


async def select_all_feedbacks() -> list[FeedbackResponse]:
    db = await get_db()
    try:
        cursor = await db.execute(
            "SELECT id, question, response, model, rating, created_at "
            "FROM feedbacks ORDER BY created_at DESC"
        )
        rows = await cursor.fetchall()
        return [
            FeedbackResponse(
                id=row["id"],
                question=row["question"],
                response=row["response"],
                model=row["model"],
                rating=row["rating"],
                created_at=row["created_at"],
            )
            for row in rows
        ]
    finally:
        await db.close()
