import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
    state = {
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        })
    }
    onShelfChange = (book, shelf) => {
        let books = this.state.books
        book.shelf = shelf

        // find the index where the book is located in the array
        let foundIndex = books.findIndex((b) => b.id === book.id)
        
        books[foundIndex] = book

        BooksAPI.update(book, shelf).then((result) => {
            this.setState({
                books: books
            })
        }).catch((e) => this.setState({books: books}))
        
    }
    render() {
        let wantToReadBooks = this.state.books.filter((book) => book.shelf === "wantToRead")
        let currentlyReadingBooks = this.state.books.filter((book) => book.shelf === "currentlyReading")
        let readBooks = this.state.books.filter((book) => book.shelf === "read")

        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReadingBooks.map((book) => (
                        <li key={book.id}>
                            <div className="book-top">
                                {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div> :
                                <div className="book-cover" style={{ width: 128, height: 193 }}></div>}
                                
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => this.onShelfChange(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                            {book.title.length > 20 ? <div className="book-title">{book.title.substring(0,20) + ".."}</div> :
                                <div className="book-title">{book.title}</div>
                            }
                            {book.authors && (
                                <div className="book-authors">{book.authors.join(", ").length > 20 ? book.authors.join(", ").substring(0, 20) + ".." : book.authors.join(", ")}</div>
                            )}
                        </li>  
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wantToReadBooks.map((book) => (
                        <li key={book.id}>
                            <div className="book-top">
                                {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div> :
                                <div className="book-cover" style={{ width: 128, height: 193 }}></div>}
                                
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => this.onShelfChange(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                            {book.title.length > 20 ? <div className="book-title">{book.title.substring(0,20) + ".."}</div> :
                                <div className="book-title">{book.title}</div>
                            }
                            {book.authors && (
                                <div className="book-authors">{book.authors.join(", ").length > 20 ? book.authors.join(", ").substring(0, 20) + ".." : book.authors.join(", ")}</div>
                            )}
                        </li>  
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {readBooks.map((book) => (
                        <li key={book.id}>
                            <div className="book-top">
                                {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div> :
                                <div className="book-cover" style={{ width: 128, height: 193 }}></div>}
                                
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => this.onShelfChange(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                            {book.title.length > 20 ? <div className="book-title">{book.title.substring(0,20) + ".."}</div> :
                                <div className="book-title">{book.title}</div>
                            }
                            {book.authors && (
                                <div className="book-authors">{book.authors.join(", ").length > 20 ? book.authors.join(", ").substring(0, 20) + ".." : book.authors.join(", ")}</div>
                            )}
                        </li>  
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
    }
}

export default ListBooks