from queries.pool import pool
from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str
    username: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:

    def get_one(self, email: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as data:
                result = data.execute(
                    """
                    SELECT id
                        , email
                        , hashed_password
                        , full_name
                        , username
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithPassword(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    full_name=record[3],
                    username=record[4],
                )

    def create(self, account: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as data:
                print("accountIN Data:", account)
                result = data.execute(
                    """
                    INSERT INTO accounts (email, hashed_password, full_name, username)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [account.email, hashed_password, account.full_name, account.username]
                )
                id = result.fetchone()[0]
                return AccountOutWithPassword(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    full_name=account.full_name,
                    username=account.username,
                )
