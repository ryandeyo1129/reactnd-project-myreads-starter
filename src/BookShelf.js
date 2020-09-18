import React from 'react';

import { Book } from './Book';

export class BookShelf extends React.Component {
  render() {
    const { shelfName, books } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, i) => {
              return (
                <li key={i}>
                  <Book thumbnail={book.imageLinks.thumbnail} title={book.title} authors={book.authors}></Book>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}