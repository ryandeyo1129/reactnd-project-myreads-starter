import React from 'react';

import { Book } from './Book';

export class BookGrid extends React.Component {
  render() {
    const { updateQuery, updateBook, bookGrid } = this.props

    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {bookGrid && bookGrid.filter(book => book.imageLinks).map((book, i) => {
            return (
              <li key={i}>
                <Book
                  book={book}
                  thumbnail={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors}
                  shelf={book.shelf}
                  updateBook={updateBook}
                  updateQuery={updateQuery}
                />
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}