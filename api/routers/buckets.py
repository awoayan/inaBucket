from typing import List
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel

from queries.pool import BucketQueries
from queries.accounts import AccountOut

router = APIRouter()


class Error(BaseModel):
    message: str


class BucketIn(BaseModel):
    title: str
    cover_photo: str
    details: str
    account_id: int


class BucketOut(BaseModel):
    id: int
    title: str
    cover_photo: str
    details: str
    owner: AccountOut


class UpdateBucketOut(BaseModel):
    title: str
    cover_photo: str
    details: str


@router.post("/api/buckets", response_model=BucketOut)
def create_bucket(
    bucket: BucketIn,
    queries: BucketQueries = Depends(),
):
    return queries.create_bucket(bucket)


@router.get("/api/buckets/{bucket_id}", response_model=BucketOut)
def get_bucket(
    bucket_id: int,
    response: Response,
    queries: BucketQueries = Depends(),
):
    record = queries.get_bucket(bucket_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/buckets", response_model=List[BucketOut])
def get_buckets(
    response: Response,
    queries: BucketQueries = Depends(),
):
    records = queries.get_buckets()
    if not records:
        response.status_code = 404
    else:
        return records


@router.put("/api/buckets/{bucket_id}", response_model=UpdateBucketOut)
def update_drop(
    bucket_id: int,
    bucket: BucketIn,
    response: Response,
    queries: BucketQueries = Depends(),
):
    record = queries.update_bucket(bucket_id, bucket)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/buckets/{bucket_id}", response_model=bool)
def delete_bucket(bucket_id: int, queries: BucketQueries = Depends()):
    queries.delete_bucket(bucket_id)
    return True
