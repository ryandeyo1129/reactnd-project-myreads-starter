import React from 'react';

import { Options } from './Options';

export class Book extends React.Component {
  render() {
    const { book, thumbnail, title, authors, updateBook } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <Options book={book} thumbnail={thumbnail} title={title} authors={authors} updateBook={updateBook} />
        </div>
        <div className="book-title">{title}</div>
        <ul className="book-authors">
          {authors && authors.map((author, i) => {
            return (
              <li key={i}>{author}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}