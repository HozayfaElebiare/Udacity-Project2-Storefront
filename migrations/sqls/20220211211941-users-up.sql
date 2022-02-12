CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userfullname VARCHAR,
    username VARCHAR(100),
    userpassword VARCHAR,
    token VARCHAR
);