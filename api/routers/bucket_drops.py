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
    cover_photo: str
    details: str
    url: str
    account_id: int
    name: str
    photo: str
    details: str
    city: str
    address: str
    url: str
    creator: str
    id: int
    bucket_id: int
    drop_id: int


@router.post("/api/bucket_drops", response_model=BucketDropsOut)
def save_drop(
    bucket_drop: BucketDropsIn,
    queries: BucketDropQueries = Depends(),

):
    return queries.save_drop(bucket_drop)


@router.get("/api/bucket_drops/{bucket_id}", response_model=ABucketsDropsOut)
def get_buckets_drops(
    bucket_id: int,
    response: Response,
    queries: BucketDropQueries = Depends(),
):
    record = queries.get_drops_in_bucket(bucket_id)
    if record is None:
        response.status_code = 404
    else:
        return record
    

