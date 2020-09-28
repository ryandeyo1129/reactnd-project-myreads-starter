import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

import { Shelves } from './components/Shelves';
import { SearchBooks } from './components/SearchBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    query: '',
    bookGrid: [],
    books: [],
    error: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          this.setState((state) => {
            return { books: state.books.concat(book) };
          })
        })
      })
  }
  updateQuery = (query) => {
    if (/^\s*$/.test(query)) {
      this.setState(() => ({
        error: false,
        bookGrid: [],
      }));
    } else {
      BooksAPI.search(query)
        .then(searchedBooks => {
          console.log('searchedBooks', searchedBooks);
          if (!searchedBooks.error) {
            this.state.books.forEach(book => {
              searchedBooks.forEach(searchedBook => {
                if (searchedBook.id === book.id) {
                  searchedBook.shelf = book.shelf;
                  console.log('compare', searchedBook, book)
                  // this.updateBook(searchedBook, book.shelf)
                } else {
                  searchedBook.shelf = 'none';
                }
              })
            })
            this.setState(() => ({
              query: query.trim(),
              bookGrid: searchedBooks,
              error: false
            }))
          } else {
            this.setState(() => ({
              error: true,
            }));
            return 'error';
          }
        })
    }
  }
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((shelves) => {
        console.log(shelves);
        for (const [shelfName, books] of Object.entries(shelves)) {
          console.log(shelfName);
          books.forEach(shelfBook => {
            if (shelfBook === book.id) {
              book.shelf = shelf
              this.setState(state => {
                return { 
                  books: state.books.filter(listBook => listBook.id !== book.id)
                }
              })
              this.setState(state => {
                return { 
                  books: state.books.concat(book)
                };
              })
            }
          })
        }
      })
  }

  render() {
    const { books, bookGrid } = this.state

    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Route exact path="/" render={() => (
          <Shelves
            updateBook={this.updateBook}
            books={books}
          />
        )} />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              error={this.state.error}
              update={this.updateBook}
              bookGrid={bookGrid}
              updateBook={this.updateBook}
              updateQuery={this.updateQuery}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
