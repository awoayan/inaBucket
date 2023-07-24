from typing import List
from fastapi import APIRouter, Depends, Response, HTTPException
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

class BucketUpdate(BaseModel):
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
    
@router.put("/api/buckets/{bucket_id}", response_model=BucketOut)
def update_bucket(
    bucket_id: int,
    data: BucketUpdate,
    queries: BucketQueries = Depends(),
):
    existing_bucket = queries.get_bucket(bucket_id)
    if existing_bucket is None:
        raise HTTPException(status_code=404, detail="Bucket not found")

    updated_bucket = queries.update_bucket(bucket_id, data)
    return updated_bucket


@router.delete("/api/buckets/{bucket_id}", response_model=bool)
def delete_bucket(bucket_id: int, queries: BucketQueries = Depends()):
    queries.delete_bucket(bucket_id)
    return True
