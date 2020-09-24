import React from 'react';

import { Book } from './Book';

export class BookShelf extends React.Component {
  render() {
    const { shelfName, books, updateBook } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ul className="books-grid">
            {books.map((book, i) => {
              return (
                <li key={i}>
                  <Book
                    book={book}
                    thumbnail={book.imageLinks.thumbnail}
                    title={book.title}
                    authors={book.authors}
                    updateBook={updateBook}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}