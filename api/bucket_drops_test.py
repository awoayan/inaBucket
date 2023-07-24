from typing import Literal, List
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from queries.bucket_drops import BucketDropQueries

router = APIRouter()


class BucketDropsIn(BaseModel):
    bucket_id: int
    drop_id: int


class BucketDropsOut(BaseModel):
    bucket_id: int
    drop_id: int
    

class ABucketsDropsOut(BaseModel):
    bucket_id: int
    bucket_title: str
    drop_id: int
    drop_name: str
    drop_photo: str
    drop_details: str
    drop_city: str
    drop_address: str
    drop_url: str
    creator_id: int
    username: str


@router.post("/api/bucket_drops", response_model=BucketDropsOut)
def save_drop(
    bucket_drop: BucketDropsIn,
    queries: BucketDropQueries = Depends(),

):
    return queries.save_drop(bucket_drop)