from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.buckets import (
    Error,
    BucketIn,
    BucketRepository,
    BucketOut,
)

router = APIRouter()

@router.post("/api/buckets", response_model=Union[BucketOut, Error])
def create_bucket(
    bucket: BucketIn,
    response: Response,
    repo: BucketRepository = Depends(),
):
    response.status_code = 400
    return repo.create(bucket)