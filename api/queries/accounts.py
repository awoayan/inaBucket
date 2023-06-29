from queries.pool import pool
from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass


class AccountRepo(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountQueries:

    def get_one(self, email: str) -> AccountRepo:
        with pool.connection() as conn:
            with conn.cursor() as data:
                result = data.execute(
                    """
                    SELECT id
                        , email
                        , hashed_password
                        full_name
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountRepo(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    full_name=record[3],
                )
            
    def create(self, account: AccountRepo, hashed_password: str) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as data:
                result = data.execute(
                    """
                    INSERT INTO accounts (email, hashed_password, full_name)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [account.email, hashed_password, account.full_name]
                )
                id = result.fetchone()[0]
                return AccountRepo(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    full_name=account.full_name,
                )