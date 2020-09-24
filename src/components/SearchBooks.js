import React from 'react';

import { BookGrid } from './BookGrid';
import { SearchBar } from './SearchBar'

export class SearchBooks extends React.Component {
  render() {
    const { updateQuery, updateBook, bookGrid, error } = this.props

    if (error) {
      return (
        <div className="search-books">
          <SearchBar updateQuery={updateQuery} />
          <div>
            <p>Invalid query</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="search-books">
          <SearchBar updateQuery={updateQuery} />
          <BookGrid updateBook={updateBook} bookGrid={bookGrid} />
        </div>
      )
    }
  }
}