import React from 'react';

import { BookShelf } from './BookShelf';
import { Link } from 'react-router-dom';

export class Shelves extends React.Component {
  render () {
    const { books, updateBook } = this.props

    return (
      <div className="list-books-content">
        <div>
          <BookShelf shelfName='Currently Reading' shelfId='currentlyReading' books={books} updateBook={updateBook} />
          <BookShelf shelfName='Want to Read' shelfId='wantToRead' books={books} updateBook={updateBook} />
          <BookShelf shelfName='Read' shelfId='read' books={books} updateBook={updateBook} />
        </div>
        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    )
  }
}