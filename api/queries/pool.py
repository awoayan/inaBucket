import os
from psycopg_pool import ConnectionPool
from routers.buckets import BucketUpdate

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class BucketQueries:


    def get_buckets(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT a.id, a.full_name,
                        a.email, a.username,
                        b.id, b.title,
                        b.cover_photo, b.details, 
                        b.account_id

                    FROM accounts a 
                    JOIN buckets b ON(a.id = b.account_id)
                
                    GROUP BY 
                        a.id, a.full_name, a.username, a.email,
                        b.id, b.title, b.cover_photo, 
                        b.details, b.account_id

                    ORDER BY b.title
                    """,
                )

                buckets = []
                rows = cur.fetchall()
                for row in rows:
                    bucket = self.bucket_record_to_dict(row, cur.description)
                    buckets.append(bucket)
                return buckets
            
    def get_bucket(self, bucket_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT a.id, a.full_name,
                        a.email, a.username,
                        b.id, b.title,
                        b.cover_photo, b.details,
                        b.account_id
                    FROM accounts a
                    JOIN buckets b ON(a.id = b.account_id)
                    WHERE b.id = %s
                    """,
                    [bucket_id],
                )

                row = cur.fetchone()
                if row is None:
                    return None
                return self.bucket_record_to_dict(row, cur.description)

    def create_bucket(self, bucket):
        id = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO buckets( 
                        title, cover_photo, details, account_id )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [                   
                        bucket.title, 
                        bucket.cover_photo,
                        bucket.details,
                        bucket.account_id,
                    ],
                )
                row = cur.fetchone()
                id = row[0]
        if id is not None:
            return self.get_bucket(id)

    def update_bucket(self, bucket_id: int, bucket: BucketUpdate):
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        bucket.title,
                        bucket.cover_photo,
                        bucket.details,
                        bucket_id,
                    ]
                    cur.execute(
                        """
                        UPDATE buckets
                        SET title = %s,
                            cover_photo = %s,
                            details = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        params,
                    )

                    row = cur.fetchone()
                    if row is not None:
                        return self.bucket_record_to_dict(row, cur.description)

    def delete_bucket(self, bucket_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM buckets
                    WHERE id = %s
                    """,
                    [bucket_id],
                )

    def bucket_record_to_dict(self, row, description):
        
        bucket = None
        if row is not None:
            bucket = {}
            bucket_fields = [
                "id",
                "title",
                "cover_photo",
                "details",
                "account_id",              
            ]

            for i, column in enumerate(description):
                if column.name in bucket_fields:
                    bucket[column.name] = row[i]
            # bucket["id"] = bucket["bucket_id"]

            owner = {}
            owner_fields = [
                "account_id",
                "full_name",
                "email",
                "username",            
            ]
            for i, column in enumerate(description):
                if column.name in owner_fields:
                    owner[column.name] = row[i]
            owner["id"] = owner["account_id"]

            bucket["owner"] = owner
        return bucket

