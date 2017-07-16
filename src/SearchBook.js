import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class SearchBook extends Component {
  state = {
    currentBooks: new Map(),
    books: [],
    query: ""
  };
  componentDidMount() {
    const mapper = new Map();

    BooksAPI.getAll().then(books => {
      for (let val of books) {
        mapper.set(val.id, val.shelf);
      }
      this.setState({
        currentBooks: mapper
      });
    });
  }
  onQueryChange = e => {
    let query = e.trim();

    BooksAPI.search(query).then(books => {
      if (books) {
        if (books.hasOwnProperty("error")) {
          this.setState({
            books: [],
            query: query
          });
        } else {
          this.setState({
            books: books,
            query: query
          });
        }
      } else {
        this.setState({
          books: [],
          query: query
        });
      }
    });
  };
  onShelfChange = (book, shelf) => {
    let currentBooks = this.state.currentBooks;

    BooksAPI.update(book, shelf).then(result => {
      currentBooks.set(book.id, shelf);
      this.setState({
        currentBooks: currentBooks
      });
    });
  };
  render() {
    let currentBooks = this.state.currentBooks;
    let books = this.state.books;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.onQueryChange(event.target.value)}
            />
          </div>
        </div>
        <BookShelf
          books={books}
          onShelfChange={this.onShelfChange}
          currentBooks={currentBooks}
          customClassName="search-books-results"
        />
      </div>
    );
  }
}

export default SearchBook;
