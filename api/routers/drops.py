from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel


from queries.drops import DropQueries
from queries.accounts import AccountOut

router = APIRouter()


class Error(BaseModel):
    message: str


class DropIn(BaseModel):
    name: str
    photo: str
    description: str
    city: str
    address: str
    url: str
    bucket_id: int


class DropOut(BaseModel):
    id: int
    name: str
    photo: str
    description: str
    city: str
    address: str
    url: str
    username: str
    ## See above - shouldnt username be accountOut? cant get it to work with just account out 
    owner: AccountOut

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