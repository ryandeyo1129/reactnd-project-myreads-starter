import React from 'react';

export class Book extends React.Component {
  state = { value: 'select' };

  onChange = (e) => {
    e.preventDefault();
    this.props.updateBook(this.props.book, e.target.value);
  }
  
  render() {
    const { thumbnail, title, authors, shelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.onChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <ul className="book-authors">
          {authors.map((author, i) => {
            return <li key={i}>{author}</li>
          })}
        </ul>
      </div>
    )
  }
}