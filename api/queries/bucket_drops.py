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

    def get_drops_in_bucket(self, bucket_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT b.id, b.title,
                        b.cover_photo, b.details, b.url, b.account_id, 
                        d.id, d.name, d.photo, d.details, d.city, 
                        d.address, d.url, d.creator,
                        bd.id, bd.bucket_id, bd.drop_id 
                    FROM buckets b
                    JOIN bucket_drops bd ON(b.id = bd.bucket_id)
                    JOIN drops d ON(d.id = bd.drop_id)
                    WHERE bd.bucket_id = %s
                    """,
                    [bucket_id],
                )
                # row = cur.fetchone()
                # if row is None:
                #     return None
                # return self.bucket_drops_record_to_dict(row, cur.description)
                record = None
                row = cur.fetchone()
                if row is not None: 
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record
            
    # def bucket_drops_record_to_dict(self, row, description):
        
    #     bucket = None
    #     if row is not None:
    #         bucket = {}
    #         bucket_fields = [
    #             "cover_photo",
    #             "details",
    #             "url",
    #             "account_id",              
    #         ]

    #         for i, column in enumerate(description):
    #             if column.name in bucket_fields:
    #                 bucket[column.name] = row[i]
    #         # bucket["id"] = bucket["bucket_id"]

    #         drop = {}
    #         drop_fields = [
    #             "name",
    #             "photo",
    #             "city",
    #             "address",
    #             "creator",            
    #         ]
    #         for i, column in enumerate(description):
    #             if column.name in drop_fields:
    #                 drop[column.name] = row[i]
    #         # drop["id"] = drop["account_id"]

    #         bucket["drop"] = drop
    #     return bucket