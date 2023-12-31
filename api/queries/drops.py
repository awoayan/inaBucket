import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class DropQueries:
    def get_drops(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT a.id, a.full_name,
                        a.email, a.username,
                        d.id, d.name,
                        d.photo, d.details, d.city,
                        d.address, d.url, d.creator_id
                    FROM accounts a

                    JOIN drops d ON(a.id = d.creator_id)

                    GROUP BY
                        a.id, a.full_name, a.username, a.email,
                        d.id, d.name,
                        d.photo, d.details, d.city,
                        d.address, d.url, d.creator_id

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
                    SELECT a.id, a.full_name,
                        a.email, a.username, d.id, d.name,
                        d.photo, d.details, d.city,
                        d.address, d.url, d.creator_id
                    FROM accounts a
                    JOIN drops d ON(a.id = d.creator_id)
                    WHERE d.id = %s
                    """,
                    [drop_id],
                )

                row = cur.fetchone()
                if row is not None:
                    return self.drop_record_to_dict(row, cur.description)

    def create_drop(self, drop):
        id = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO drops(
                        name, photo, details, city, address, url, creator_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        drop.name,
                        drop.photo,
                        drop.details,
                        drop.city,
                        drop.address,
                        drop.url,
                        drop.creator_id,
                    ],
                )
                row = cur.fetchone()
                drop_id = row[0]
                print("dropID:", drop_id)
                cur.execute(
                    """
                    INSERT INTO bucket_drops(
                        bucket_id,
                        drop_id
                        )
                    VALUES (%s, %s)
                    RETURNING *;
                    """,
                    [drop.bucket_id, drop_id],
                )
                row2 = cur.fetchone()
                id = row2[2]
                print("row2:", row2)

        if id is not None:
            return_drop = self.get_drop(id)
            print("returndrop:", return_drop)
            return return_drop

    def update_drop(self, drop_id, drop):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    drop.name,
                    drop.photo,
                    drop.details,
                    drop.city,
                    drop.address,
                    drop.url,
                    drop_id,
                ]
                cur.execute(
                    """
                    UPDATE drops
                    SET name = %s,
                        photo = %s,
                        details = %s,
                        city = %s,
                        address = %s,
                        url = %s
                    WHERE id = %s
                    RETURNING name, photo, details, city, address, url,
                    creator_id
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def delete_drop(self, drop_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM drops
                    WHERE id = %s
                    """,
                    [drop_id],
                )

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
                "creator_id",
            ]

            for i, column in enumerate(description):
                if column.name in drop_fields:
                    drop[column.name] = row[i]

            creator_id = {}
            creator_fields = [
                "creator_id",
                "email",
                "full_name",
                "username",
            ]
            for i, column in enumerate(description):
                if column.name in creator_fields:
                    creator_id[column.name] = row[i]
            creator_id["id"] = creator_id["creator_id"]

            drop["creator_id"] = creator_id
        return drop
