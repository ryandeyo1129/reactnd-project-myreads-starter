import React from 'react';
import { Link } from 'react-router-dom';

export class SearchBar extends React.Component {
  state = { value: '' }
  handleChange = (event) => {
    this.setState(
      { value: event.target.value },
      () => {
        this.props.updateQuery(this.state.value);
      }
    );
  };
  render() {
    const { value } = this.state
    return (
      <div className="search-books-bar">
        <Link to="/" >
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}