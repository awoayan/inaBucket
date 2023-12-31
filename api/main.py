from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, buckets, drops, bucket_drops

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(buckets.router)
app.include_router(drops.router)
app.include_router(bucket_drops.router)


origins = [
    "http://localhost:3000",
    "https://macstephens.gitlab.io/module3-project-gamma/",
    "https://fastapi.mod3projects.com",

    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
