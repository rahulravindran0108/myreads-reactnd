import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    let { books, onShelfChange } = this.props;
    let currentBooks = this.props.currentBooks
      ? this.props.currentBooks
      : new Map();
    let customClassName = this.props.customClassName;
    console.log(currentBooks);
    return (
      <div className={customClassName}>
        <ol className="books-grid">
          {books.map(book =>
            <li key={book.id}>
              <Book
                onShelfChange={onShelfChange}
                book={book}
                selectValue={currentBooks.get(book.id)}
              />
            </li>
          )}
        </ol>
      </div>
    );
  }
}

export default BookShelf;
