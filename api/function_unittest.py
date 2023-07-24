# router.py
from authenticator import authenticator
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import date

router = APIRouter()


class ThingOut(BaseModel):
    thing: int


class ErrorOut(BaseModel):
    reason: str


@router.post("/api/thing")
async def get_thing(
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> ThingOut:
    return ThingOut(thing=2)


@router.post("/api/thing")
async def get_thing() -> ThingOut | HTTPException:
    account_data = authenticator.try_get_current_account_data()
    if account_data:
        return ThingOut(thing=2)
    else:
    raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )