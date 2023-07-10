import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class DropQueries:


    def get_drops(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT b.id, b.title, b.username,
                        b.cover_photo, b.descriptionxxx, b.url,
                        b.user_id, d.id, d.name,
                        d.photo, d.description, d.city,
                        d.address, d.url, d.bucket_id
                    FROM buckets b 
                    JOIN drops d ON(b.id = d.drop_id)
                
                    GROUP BY 
                        b.title, b.username, b.cover_photo, 
                        b.descriptionxxx, b.url, b.user_id, 
                        d.id, d.name, d.photo,
                        d.description, d.city,
                        d.address, d.url, d.bucket_id

                    ORDER BY d.name
                    """,
                )

                drops = []
                rows = cur.fetchall()
                for row in rows:
                    drop = self.drop_record_to_dict(row, cur.description)
                    drops.append(drop)
                return drops
            
    def get_drop(self, drop_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT b.id, b.title, b.username,
                        b.cover_photo, b.descriptionxxx, b.url,
                        b.user_id, d.id, d.name, 
                        d.photo, d.description, d.city,
                        d.address, d.url, d.bucket_id
                    FROM buckets b
                    JOIN drops d ON(b.id = d.bucket_id)
                    WHERE d.id = %s
                    """,
                    [drop_id],
                )

                row = cur.fetchone()
                if row is None:
                    return None
                return self.drop_record_to_dict(row, cur.description)

    def create_drop(self, drop):
            id = None
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO drops( 
                            name, photo, description, city, address, url, bucket_id )
                        VALUES ( %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            drop.name, 
                            drop.photo,
                            drop.description,
                            drop.city,
                            drop.address,
                            drop.url,
                            drop.bucket_id,
                        ],
                    )
                    row = cur.fetchone()
                    id = row[0]
            if id is not None:
                return self.get_drop(id)

    def drop_record_to_dict(self, row, description):
        
        drop = None
        if row is not None:
            drop = {}
            drop_fields = [
                "bucket_id",
                "name",
                "photo",
                "description",
                "city",
                "address",
                "url",           
            ]

            for i, column in enumerate(description):
                if column.name in drop_fields:
                    drop[column.name] = row[i]
            drop["id"] = drop["bucket_id"]

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

            drop["owner"] = owner
        return drop
