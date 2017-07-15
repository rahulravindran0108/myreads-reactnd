import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
    state = {
        currentBooks: new Map(),
        books: [],
        query: ""
    }
    componentDidMount() {
        const mapper = new Map()

        BooksAPI.getAll().then((books) => {
            for(let val of books) {
                mapper.set(val.id, val.shelf)
            }
            this.setState({
                currentBooks: mapper
            })
        })
    }
    onQueryChange = (e) => {
        let query = e.trim()

        BooksAPI.search(query).then((books) => {
            if(books) {
                if(books.hasOwnProperty('error')) {
                    this.setState({
                        books: [],
                        query: query
                    })
                } else {
                    this.setState({
                        books: books,
                        query: query
                    })
                }
            } else {
                this.setState({
                    books: [],
                    query: query
                })
            }
            
        })
    }
    onShelfChange = (book, shelf) => {
        let currentBooks = this.state.currentBooks
        
        BooksAPI.update(book, shelf).then((result) => {
            currentBooks.set(book.id, shelf)
            this.setState({
                currentBooks: currentBooks
            })
        })
    }
    render() {
        let currentBooks = this.state.currentBooks

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"
                        to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author" 
                            onChange={(event) => this.onQueryChange(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <div className="book-top">
                                    {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div> :
                                    <div className="book-cover" style={{ width: 128, height: 193 }}></div>}
                                    
                                        <div className="book-shelf-changer">
                                            {currentBooks.has(book.id) ? 
                                                   <select value={currentBooks.get(book.id)} onChange={(event) => this.onShelfChange(book, event.target.value)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select> 
                                                :
                                                <select value="none" onChange={(event) => this.onShelfChange(book, event.target.value)}>
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            }
                                            
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
        )
    }
}

export default SearchBook
