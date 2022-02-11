CREATE TABLE books (
    id SERIAL PRIMARY  KEY,
    title VARCHAR(150),
    total_pages integer,
    author VARCHAR(255),
    typeers VARCHAR(100),
    summary text
);

-- Insert into books (title,total_pages,author,typeers,summary) values ('Hozayfa',253,'hozayfa elebiare', 'magic', 'very good book for kids')