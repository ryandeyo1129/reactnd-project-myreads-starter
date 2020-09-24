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
    currentlyReading: [],
    wantToRead: [],
    read: [],
    error: false
  }

  updateQuery = (query) => {
    if (query === '' || query === '^\\s+$') {
      this.setState(() => ({
        error: false,
        bookGrid: [],
      }));
    } else {
      BooksAPI.search(query)
        .then(books => {
          if (!books.error) {
            this.setState(() => ({
              query: query.trim(),
              bookGrid: books
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
  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          if (book.shelf === 'currentlyReading') {
            this.setState((state) => {
              return { currentlyReading: state.currentlyReading.concat(book) };
            })
          }
          if (book.shelf === 'wantToRead') {
            this.setState((state) => {
              return { wantToRead: state.wantToRead.concat(book) };
            })
          }
          if (book.shelf === 'read') {
            this.setState((state) => {
              return { read: state.read.concat(book) };
            })
          }
        })
      })
  }
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((shelves) => {
        this.setState((state) => ({
          currentlyReading: state.currentlyReading.filter((b) => b.title !== book.title),
          wantToRead: state.wantToRead.filter((b) => b.title !== book.title),
          read: state.read.filter((b) => b.title !== book.title)
        }));
        for (const [shelfName, books] of Object.entries(shelves)) {
          books.forEach(shelfBook => {
            if (shelfBook === book.id) {
              if (shelfName === 'currentlyReading') {
                book.shelf = 'currentlyReading'
                this.setState((state) => {
                  return { currentlyReading: state.currentlyReading.concat(book) };
                })
              }
              if (shelfName === 'wantToRead') {
                book.shelf = 'wantToRead'
                this.setState((state) => {
                  return { wantToRead: state.wantToRead.concat(book) };
                })
              }
              if (shelfName === 'read') {
                book.shelf = 'read'
                this.setState((state) => {
                  return { read: state.read.concat(book) };
                })
              }
            }
          })
        }
      })
  }

  render() {
    const { bookGrid, currentlyReading, wantToRead, read } = this.state

    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Route exact path="/" render={() => (
          <Shelves
            updateBook={this.updateBook}
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
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
