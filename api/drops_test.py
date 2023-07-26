# from typing import Literal, List
# from fastapi import APIRouter, Depends, Response
# from pydantic import BaseModel


# from queries.drops import DropQueries
# from queries.accounts import AccountOut
# from routers.buckets import BucketOut


# router = APIRouter()


# class Error(BaseModel):
#     message: str


# class DropIn(BaseModel):
#     name: str
#     photo: str
#     details: str
#     city: str
#     address: str
#     url: str
#     creator_id: int
#     bucket_id: int


# class DropOut(BaseModel):
#     id: int
#     name: str
#     photo: str
#     details: str
#     city: str
#     address: str
#     url: str
#     creator_id: AccountOut


# @router.get("/api/drops", response_model=List[DropOut])
# def get_drops(
#     response: Response,
#     queries: DropQueries = Depends(),
# ):
#     records = queries.get_drops()
#     if records is None:
#         response.status_code = 404
#     else:
#         return records

