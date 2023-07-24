from typing import List
from fastapi import APIRouter, Depends, Response, HTTPException
from pydantic import BaseModel


from queries.drops import DropQueries
from queries.accounts import AccountOut
from routers.buckets import BucketOut

router = APIRouter()


class Error(BaseModel):
    message: str


class DropIn(BaseModel):
    name: str
    photo: str
    details: str
    city: str
    address: str
    url: str
    creator_id: int
    bucket_id: int


class DropOut(BaseModel):
    id: int
    name: str
    photo: str
    details: str
    city: str
    address: str
    url: str
    creator_id: AccountOut

class DropUpdate(BaseModel):
    name: str
    photo: str
    details: str
    city: str
    address: str
    url: str


@router.post("/api/drops", response_model=DropOut)
def create_drop(
    drop: DropIn,
    queries: DropQueries = Depends(),
):
    return queries.create_drop(drop)


@router.get("/api/drops/{drop_id}", response_model=DropOut)
def get_drop(
    drop_id: int,
    response: Response,
    queries: DropQueries = Depends(),
):
    record = queries.get_drop(drop_id)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.get("/api/drops", response_model=List[DropOut])
def get_drops(
    response: Response,
    queries: DropQueries = Depends(),
):
    records = queries.get_drops()
    if records is None:
        response.status_code = 404
    else:
        return records
    
@router.put("/api/drops/{drop_id}", response_model=DropOut)
def update_drop(
    drop_id: int,
    drop_update: DropUpdate,
    queries: DropQueries = Depends(),
):
    existing_drop = queries.get_drop(drop_id)
    if existing_drop is None:
        raise HTTPException(status_code=404, detail="Drop not found")

    updated_drop = queries.update_drop(drop_id, drop_update)
    return updated_drop

@router.delete("/api/drops/{drop_id}", response_model=bool)
def delete_drop(drop_id: int, queries: DropQueries = Depends()):
    queries.delete_drop(drop_id)
    return True
