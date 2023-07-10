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
                        b.cover_photo, b.descriptionxxx, b.url,
                        b.user_id

                    FROM accounts a 
                    JOIN buckets b ON(a.id = b.user_id)
                
                    GROUP BY 
                        a.id, a.full_name, a.username, b.email,
                        b.id, b.title, b.username, b.cover_photo, 
                        b.descriptionxxx,
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
                        b.cover_photo, b.descriptionxxx, b.url,
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
                return self.bucket_record_to_dict(row, cur.description)
            
    def get_all_buckets(self):
        with pool.connection()as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT a.id, a. full_name, a.email, a.username,
                        b.id, b.title, b.username, b.cover_photo, b.descriptionxxx, b.url, b.user_id
                    FROM accounts a
                    JOIN buckets b ON (a.id = b.user_id)
                    """
                )
                rows = cur.fetchall()
                if rows is None: 
                    return []
                return [self.bucket_record_to_dict(row, cur.description) for row in rows]
            
    def create_bucket(self, bucket):
            id = None
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO buckets( 
                            title, username, cover_photo, descriptionxxx, url, user_id )
                        VALUES ( %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            bucket.title, 
                            bucket.username,
                            bucket.cover_photo,
                            bucket.descriptionxxx,
                            bucket.url,
                            bucket.user_id,
                        ],
                    )
                    row = cur.fetchone()
                    id = row[0]
            if id is not None:
                return self.get_bucket(id)

    def bucket_record_to_dict(self, row, description):
        
        bucket = None
        if row is not None:
            bucket = {}
            bucket_fields = [
                "user_id",
                "title",
                "username",
                "cover_photo",
                "descriptionxxx",
                "url"              
            ]

            for i, column in enumerate(description):
                if column.name in bucket_fields:
                    bucket[column.name] = row[i]
            bucket["id"] = bucket["user_id"]

            owner = {}
            owner_fields = [
                "user_id",
                "full_name",
                "email",  
                "username",          
            ]
            for i, column in enumerate(description):
                if column.name in owner_fields:
                    owner[column.name] = row[i]
            owner["id"] = owner["user_id"]

            bucket["owner"] = owner
        return bucket




       
