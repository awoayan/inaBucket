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
                    SELECT b.id AS bucket_id, b.title AS bucket_title,
                        d.id AS drop_id, d.name AS drop_name,
                        d.photo AS drop_photo, d.details AS drop_details,
                        d.city AS drop_city, d.address AS drop_address,
                        d.url AS drop_url
                    FROM buckets b
                    JOIN bucket_drops bd ON b.id = bd.bucket_id
                    JOIN drops d ON d.id = bd.drop_id
                    WHERE b.id = %s
                    ORDER BY b.title, d.name;
                    """,
                    [bucket_id]
                )
                # row = cur.fetchone()
                # if row is None:
                #     return None
                # return self.bucket_drops_record_to_dict(row, cur.description)
                buckets_drops = []
                for row in cur.fetchall(): 
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    buckets_drops.append(record)
                
                return buckets_drops
            
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