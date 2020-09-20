import React from 'react';

import { Book } from './Book';

export class BookShelf extends React.Component {
  render() {
    const { shelfName, shelfValue, books, updateBook } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === shelfValue).map((book, i) => {
              return (
                <li key={i}>
                  <Book
                    book={book}
                    thumbnail={book.imageLinks.thumbnail}
                    title={book.title}
                    authors={book.authors}
                    shelf={book.shelf}
                    updateBook={updateBook}
                  />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}