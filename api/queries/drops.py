import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class DropQueries:


    def get_drops(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT d.id, d.name, 
                        d.photo, d.details, d.city,
                        d.address, d.url
                    FROM drops d
                    GROUP BY d.id, d.name,
                        d.photo, d.details, d.city,
                        d.address, d.url 

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
        pass
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT d.id, d.name, 
                        d.photo, d.details, d.city,
                        d.address, d.url
                    FROM drops d
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
                            name, photo, details, city, address, url )
                        VALUES ( %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            drop.name, 
                            drop.photo,
                            drop.details,
                            drop.city,
                            drop.address,
                            drop.url,
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
                "id",
                "name",
                "photo",
                "details",
                "city",
                "address",
                "url",           
            ]

            for i, column in enumerate(description):
                if column.name in drop_fields:
                    drop[column.name] = row[i]
            # drop["id"] = drop["bucket_id"]

            # owner = {}
            # owner_fields = [
            #     "user_id",
            #     "full_name",
            #     "email",  
            #     "username",          
            # ]
            # for i, column in enumerate(description):
            #     if column.name in owner_fields:
            #         owner[column.name] = row[i]
            # owner["id"] = owner["user_id"]

            # drop["owner"] = owner
        return drop
