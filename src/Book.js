import React, { Component } from "react";

class Book extends Component {
  render() {
    let book = this.props.book;
    let imageLink = book.imageLinks
      ? book.imageLinks.smallThumbnail
      : "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    let title =
      book.title.length > 20 ? book.title.substring(0, 20) + "..." : book.title;
    let authors = "";

    let shelf = this.props.selectValue
      ? this.props.selectValue
      : book.shelf ? book.shelf : "none";
    console.log(shelf);

    if (book.authors)
      authors =
        book.authors.join(", ").length > 20
          ? book.authors.join(", ").substring(0, 20) + ".."
          : book.authors.join(", ");

    return (
      <div>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLink}")`
            }}
          />}
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={event =>
                this.props.onShelfChange(book, event.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {title}
        </div>
        <div className="book-authors">
          {authors}
        </div>
      </div>
    );
  }
}

export default Book;
