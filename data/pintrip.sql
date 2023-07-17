DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS buckets;
DROP TABLE IF EXISTS drops;
DROP TABLE IF EXISTS bucket_drops; 

CREATE TABLE accounts (
    id SERIAL NOT NULL UNIQUE,
    full_name VARCHAR(250) NOT NULL,
    avatar TEXT,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password VARCHAR(200) NOT NULL
);

CREATE TABLE buckets (
    id SERIAL NOT NULL UNIQUE,
    title TEXT NOT NULL,
    cover_photo TEXT NOT NULL,
    details TEXT NOT NULL, 
    account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE
);

CREATE TABLE drops (
    id SERIAL NOT NULL UNIQUE,
    name TEXT NOT NULL,
    photo TEXT NOT NULL,
    details TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    url TEXT NOT NULL,
    creator_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE

);

CREATE TABLE bucket_drops (
    id SERIAL NOT NULL UNIQUE,
    bucket_id INTEGER NOT NULL REFERENCES buckets("id") ON DELETE CASCADE,
    drop_id INTEGER NOT NULL REFERENCES drops("id") ON DELETE CASCADE
);

-- INSERT INTO accounts VALUES
-- (1, 'John Smith', '1780000.jpeg', 'John@gmail.com', 'Jsmith', 'abc'),
-- (2, 'Dave Jones', '178030988.jpeg', 'Dave@gmail.com', 'Djones', 'abc'),
-- (3, 'Patrick Lacquer', '17800.jpeg', 'Patrick@gmail.com', 'Placquer', 'abc'),
-- (4, 'Abbie Schmabbie', '10000.jpeg', 'Abbie@gmail.com', 'Aschabbie', 'abc'),
-- (5, 'David Agarwal', '170000.jpeg', 'David@gmail.com', 'Dagarwal', 'abc')
-- ;

INSERT INTO buckets VALUES
(1, 'Canada Time!', 'https://tinyurl.com/4bahsdf2', 'The Mona-Lisa is TOTALLY about travel', 1),
(2, 'Vermont For the Win', 'https://tinyurl.com/4bahsdf2', 'The Mona-Lisa is TOTALLY about travel', 1),
(3, 'Minnesota, Wow!', 'https://tinyurl.com/4bahsdf2', 'The Mona-Lisa is TOTALLY about travel', 1),
(4, 'Kansas Trip', 'https://tinyurl.com/4bahsdf2', 'The Mona-Lisa is TOTALLY about travel', 2),
(5, 'Amandas Titanic Joke', 'https://tinyurl.com/4bahsdf2', 'The Mona-Lisa is TOTALLY about travel', 3)
;

INSERT INTO drops VALUES
(1, 'Oceangate', 'https://tinyurl.com/yjtrdv95', 'Some Drop Details', 'Atlantic Ocean', '123 Address Road', 'https://www.oceangate.com/', 1),
(2, 'Ball of Twine', 'https://tinyurl.com/yjtrdv95', 'Some Drop Details', 'Cawker City', '123 Address Road', 'http://www.kansastravel.org/balloftwine.htm', 2),
(3, 'First Watch', 'https://tinyurl.com/yjtrdv95', 'Some Drop Details', 'Cawker City', '123 Address Road', 'https://www.firstwatch.com/', 3),
(4, 'Ben and Jerrys', 'https://tinyurl.com/yjtrdv95', 'Some Drop Details', 'Burlington', '1281 Waterbury-Stowe Road, Vermont Rte 100, Waterbury Village Historic District, VT 05676', 'https://www.benjerry.com/flavors/flavor-graveyard', 1),
(5, 'Royal Ontario Museum', 'https://tinyurl.com/yjtrdv95', 'Some Drop Details', 'Ontario', '123 Canada St', 'https://tinyurl.com/3ux7vn3r', 1)
;

INSERT INTO bucket_drops VALUES
(1, 1, 5),
(2, 4, 2),
(3, 4, 3),
(4, 5, 1),
(5, 2, 4)
;


-- SELECT setval('accounts_id_seq', (SELECT MAX(id) + 1 FROM accounts));
SELECT setval('buckets_id_seq', (SELECT MAX(id) + 1 FROM buckets));
SELECT setval('drops_id_seq', (SELECT MAX(id) + 1 FROM drops));
SELECT setval('bucket_drops_id_seq', (SELECT MAX(id) + 1 FROM bucket_drops));