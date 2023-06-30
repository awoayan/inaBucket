from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str
    
class BucketIn(BaseModel):
    title: str
    cover_photo: bytearray
    description: str
    url: str

class BucketOut(BaseModel):
    id: int
    title: str
    username: str
    cover_photo: str
    description: str
    url: str
    user_id: int

class BucketRepository:
    def create_bucket(self, bucket: BucketIn) -> Union [BucketOut, Error]:
        try: 
            with pool.connection() as conn:
                with conn.cursor() as data:
                    result = data.execute(
                        """
                        INSERT INTO buckets
                            ( title, cover_photo, description, url )
                        VALUES 
                            ( %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            bucket.title, 
                            bucket.cover_photo,
                            bucket.description,
                            bucket.url
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.bucket_in_to_out(id,bucket)
        except Exception:
            return {"message": "Creation did not work."}

    def bucket_in_to_out(self, id: int, bucket: BucketIn):
        old_data = bucket.dict()
        return BucketOut(id=id, **old_data)
    
    def record_to_bucket_out(self, record):
        return BucketOut(
            id=record[0],
            title=record[1],
            cover_photo=record[2],
            description=record[3],
            url=record[4],
        )