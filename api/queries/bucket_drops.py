import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])



class BucketDropQueries: 

    def save_drop(self, bucket_drop):
        # bucket_drop_id = None
        with pool.connection() as conn:
            with conn.cursor() as cur: 
                cur.execute(
                    """
                    INSERT INTO bucket_drops(bucket_id, drop_id)
                    VALUES (%s, %s)
                    RETURNING *; 
                    """,
                    [
                        bucket_drop.drop_id,
                        bucket_drop.bucket_id

                    ],
                )
                record = None
                row = cur.fetchone()
                if row is not None: 
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

