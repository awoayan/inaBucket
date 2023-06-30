from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from queries.pool import BucketQueries
router = APIRouter()

class Error(BaseModel):
    message: str
    
class BucketIn(BaseModel):
    title: str
    cover_photo: str
    description: str
    url: str
    user_id: int

class BucketOut(BaseModel):
    id: int
    title: str
    username: str
    cover_photo: str
    description: str
    url: str
    user_id: int

@router.post("/api/buckets", response_model=BucketOut)
def create_bucket(
    bucket: BucketIn,
    queries:BucketQueries=Depends(),
):
    return queries.create_bucket(bucket)