from typing import Literal, Optional
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel


from queries.pool import BucketQueries
from queries.accounts import AccountOut

router = APIRouter()


class Error(BaseModel):
    message: str


class BucketIn(BaseModel):
    title: str
    username: str
    cover_photo: str
    descriptionxxx: str
    url: str
    user_id: int


class BucketOut(BaseModel):
    id: int
    title: str
    cover_photo: str
    descriptionxxx: str
    url: str
    username: str
    ## See above - shouldnt username be accountOut? cant get it to work with just account out 
    owner: AccountOut  

class BucketPatch(BaseModel):
    title: Optional[str]
    cover_photo: Optional[str]
    descriptionxxx: Optional[str]
    url: Optional[str]
    

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
    

@router.put("/api/buckets/{bucket_id}", response_model=BucketOut)
def update_bucket(
    bucket_id: int,
    bucket_in: BucketIn,
    response: Response,
    queries: BucketQueries = Depends(),

):
    record = queries.update(bucket_id, bucket_in)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/buckets/{bucket_id}", response_model=bool)
def delete_bucket(bucket_id: int, queries: BucketQueries = Depends()):
    queries.delete_bucket(bucket_id)
    return True