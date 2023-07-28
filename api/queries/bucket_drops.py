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
                        bucket_drop.bucket_id,
                        bucket_drop.drop_id,
                    ],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def get_drops_in_bucket(self, bucket_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT b.id AS bucket_id, b.title AS bucket_title,
                        d.id AS drop_id, d.name AS drop_name,
                        d.photo AS drop_photo, d.details AS drop_details,
                        d.city AS drop_city, d.address AS drop_address,
                        d.url AS drop_url,
                        a.id AS creator_id, a.username
                    FROM buckets b
                    JOIN bucket_drops bd ON b.id = bd.bucket_id
                    JOIN drops d ON d.id = bd.drop_id
                    JOIN accounts a ON a.id = d.creator_id
                    WHERE b.id = %s
                    ORDER BY b.id, d.id;
                    """,
                    [bucket_id],
                )

                buckets_drops = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    buckets_drops.append(record)

                return buckets_drops
