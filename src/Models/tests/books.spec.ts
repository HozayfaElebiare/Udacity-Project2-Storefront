import { Book, BookStore } from '../books';

const store = new BookStore()

describe("Book Model", () => {
  it('1. should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('2. should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('3. should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('4. should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('5. should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('6. create method should add a book', async () => {
    const result = await store.create({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      typeers: 'Childrens',
      summary:'summary'
    });
    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      typeers: 'Childrens',
      summary:'summary'
    });
  });

  it('7. index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      typeers: 'Childrens',
      summary:'summary'
    }]);
  });

  it('8. show method should return the correct book', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      typeers: 'Childrens',
      summary:'summary'

    });
  });

  it('9. delete method should remove the book', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});