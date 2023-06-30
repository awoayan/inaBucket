DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS buckets;
DROP TABLE IF EXISTS drops;
DROP TABLE IF EXISTS bucket_drops; 

CREATE TABLE accounts (
    id SERIAL NOT NULL UNIQUE,
    full_name VARCHAR(250) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password VARCHAR(200) NOT NULL
);

CREATE TABLE buckets (
    id SERIAL NOT NULL UNIQUE,
    title TEXT NOT NULL,
    username TEXT NOT NULL REFERENCES accounts("username") ON DELETE CASCADE,
    cover_photo BYTEA,
    description TEXT NOT NULL,
    url TEXT NOT NULL, 
    user_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE
);

CREATE TABLE drops (
    id SERIAL NOT NULL UNIQUE,
    name TEXT NOT NULL,
    photo BYTEA,
    description TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    url TEXT NOT NULL
);

CREATE TABLE bucket_drops (
    id SERIAL NOT NULL UNIQUE,
    bucket_id INTEGER NOT NULL REFERENCES buckets("id") ON DELETE CASCADE,
    drop_id INTEGER NOT NULL REFERENCES drops("id") ON DELETE CASCADE
);