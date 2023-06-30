import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class BucketQueries:
    def create_bucket(self, bucket):
            id=None
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
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
                            bucket.url,
                            bucket.user_id,
                        ]
                    )
                    row=cur.fetchone()
                    id = row[0]
            if id is not None:
                return {"message": "failed to create bucket"}