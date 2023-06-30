import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class BucketQueries:
    def get_buckets(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT a.id, a.full_name,
                        a.email, a.username,
                        b.id, b.title, b.username,
                        b.cover_photo, b.description, b.url,
                        b.user_id

                    FROM accounts a 
                    JOIN buckets b ON(a.id = b.user_id)
                
                    GROUP BY 
                        a.id, a.full_name, a.username, b.email,
                        b.id, b.title, b.username, b.cover_photo, 
                        b.description,
                        b.url, b.user_id

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
                        b.id, b.title, b.username,
                        b.cover_photo, b.description, b.url,
                        b.user_id
                    FROM accounts a
                    JOIN buckets b ON(a.id = b.user_id)
                    WHERE b.id = %s
                    """,
                    [bucket_id],
                )

                row = cur.fetchone()
                if row is None:
                    return None
                return self.bucket_record_to_dict(row)

    def create_bucket(self, bucket):
            id = None
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO buckets
                            ( title, username, cover_photo, description, url, user_id )
                        VALUES 
                            ( %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            bucket.title, 
                            bucket.username,
                            bucket.cover_photo,
                            bucket.description,
                            bucket.url,
                            bucket.user_id,
                        ]
                    )
                    row = cur.fetchone()
                    id = row[0]
            if id is not None:
                return self.get_bucket(id)

    def bucket_record_to_dict(self, row):
        return (
            id=row[0],
            title=row[1],
            username=row[2],
            cover_photo=row[3],
            description=row[4],
            url=row[5],
            user_id=row[6]
        )
