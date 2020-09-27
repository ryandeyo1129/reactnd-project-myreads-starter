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
        console.log(books)
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
        .then(books => {
          console.log(books);
          if (!books.error) {
            BooksAPI.getAll()
              .then(bookResults => {
                bookResults.forEach(bookResult => {
                  books.forEach(book => {
                    if (bookResult.id === book.id) {
                      book.shelf = bookResult.shelf
                      this.updateBook(bookResult, bookResult.shelf)
                    } else {
                      book.shelf = bookResult.shelf
                      // this.updateBook(book, 'none')
                    }
                  })
                })
              })
            this.setState(() => ({
              query: query.trim(),
              bookGrid: books,
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
        let bookList = this.state.books
        book.shelf = shelf

        this.setState(state => {
          return { 
            books: state.books.filter(listBook => listBook.id === book.id)
          }
        })
        this.setState({
          books: bookList
        })
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
