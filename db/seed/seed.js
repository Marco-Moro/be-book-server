const db = require("../connection");
const format = require("pg-format")

const seed = ({authorData, booksData}) => {
  return db.query(`DROP TABLE IF EXISTS books;`)
  .then(()=> {
    return db.query(`DROP TABLE IF EXISTS authors;`)
  })
  .then(()=> {
    return db.query(`CREATE TABLE authors (
       author_id SERIAL PRIMARY KEY,
       full_name VARCHAR NOT NULL,
       fun_fact VARCHAR NOT NULL );`)
  })
  .then(()=> {
    return db.query(`CREATE TABLE books (
       book_id SERIAL PRIMARY KEY,
       book_title VARCHAR NOT NULL,
       author_id INT REFERENCES authors(author_id) NOT NULL,
       is_fiction BOOLEAN NOT NULL);`)
  })
  .then(()=> {
    const insertAuthorsQueryStr = format(
        'INSERT INTO authors (full_name, fun_fact) VALUES %L;',
        authorData.map((author)=> {
            return [
                author.fullName,
                author.funFact
            ]
        })
    )
    return db.query(insertAuthorsQueryStr)
  })
  .then(()=> {
    const insertBooksQueryStr = format(
        `INSERT INTO books (book_title, author_id, is_fiction) VALUES %L;`,
        booksData.map((book)=> {
            return [
                book.bookTitle,
                book.authorId,
                book.isFiction
            ]
        })
    )
    return db.query(insertBooksQueryStr)
  })
};

module.exports = seed;
