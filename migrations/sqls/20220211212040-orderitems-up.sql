CREATE TABLE orderitems (
    id SERIAL PRIMARY KEY,
    quantity int not null,
    orderid bigint references orders(id),
    productid bigint references products(id)
    );