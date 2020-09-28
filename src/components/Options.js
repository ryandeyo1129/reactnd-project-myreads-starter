import React from 'react';

export class Options extends React.Component {
  state = { value: this.props.book.shelf };

  updateBook = () => {
    this.props.updateBook(this.props.book, this.state.value);
  };
  onChange = (e) => {
    e.preventDefault();

    if (window.location.pathname === "/") {
      const shelfSelect = e.target.value;
      this.setState({ value: shelfSelect }, () => { this.updateBook(); })
    } else {
      const shelfSelect = e.target.value;
      this.setState({ value: shelfSelect }, () => { this.updateBook(); })
    }
  }
  
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.onChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}