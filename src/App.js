import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListBooks} />
        <Route path="/search" component={SearchBook} />
      </div>
    )
  }
}

export default BooksApp
