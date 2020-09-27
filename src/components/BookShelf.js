import React from 'react';

import { Book } from './Book';

export class BookShelf extends React.Component {
  render() {
    const { shelfName, books, updateBook, shelfId } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ul className="books-grid">
            {books.filter(filterBook => filterBook.shelf === shelfId).map((book) => {
              return (
                <li key={book.id}>
                  <Book
                    book={book}
                    thumbnail={book.imageLinks.thumbnail}
                    title={book.title}
                    authors={book.authors}
                    updateBook={updateBook}
                    shelfId={shelfId}
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