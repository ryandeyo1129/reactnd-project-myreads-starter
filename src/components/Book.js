import React from 'react';

import { Options } from './Options';

export class Book extends React.Component {
  render() {
    const { book, thumbnail, title, authors, updateBook, shelfId } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <Options book={book} shelfId={shelfId} thumbnail={thumbnail} title={title} authors={authors} updateBook={updateBook} />
        </div>
        <div className="book-title">{title}</div>
        <ul className="book-authors">
          {authors && authors.map((author) => {
            return (
              <li key={author}>{author}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}