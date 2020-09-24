import React from 'react';

import { BookShelf } from './BookShelf';
import { Link } from 'react-router-dom';

export class Shelves extends React.Component {
  render () {
    const { currentlyReading, wantToRead, read, updateBook } = this.props

    return (
      <div className="list-books-content">
        <div>
          <BookShelf shelfName='Currently Reading' books={currentlyReading} updateBook={updateBook} />
          <BookShelf shelfName='Want to Read' books={wantToRead} updateBook={updateBook} />
          <BookShelf shelfName='Read' books={read} updateBook={updateBook} />
        </div>
        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    )
  }
}