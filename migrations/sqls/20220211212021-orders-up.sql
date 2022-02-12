CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    orderstatus VARCHAR(250) not null,
    userid bigint references users(id)
    );