

CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    -- password??????
    

);

CREATE TABLE buckets (
    id SERIAL NOT NULL UNIQUE,
    title TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    cover_photo BLOB,
    description TEXT NOT NULL,
    url TEXT NOT NULL, 
    user_id INTEGER NOT NULL REFERENCES users('id') ON DELETE CASCADE
     
);

CREATE TABLE drops (
    id SERIAL NOT NULL UNIQUE,
    name TEXT NOT NULL,
    photo BLOB,
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