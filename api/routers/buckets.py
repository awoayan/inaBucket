from typing import Literal
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