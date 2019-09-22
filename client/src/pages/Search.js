import React, { Component } from 'react'
import Header from "../components/Header/Header";
import BookSearch from "../components/BookSearch/BookSearch";
import SearchResults from "../components/SearchResults/SearchResults"

import API from '../utils/API'

class Search extends Component {
  state = {
    search: "",
    searchResults: [],
    savedBooks: [],
    searchPage: true,
    books: {},
  }

  handleInputChange = event => {
    const noSpaces = event.target.value.replace(/\s/g, '');
    this.setState({ search: noSpaces });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchBooks(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ searchResults: res.data.items, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  handleClickSave = (body, event) => {
    event.preventDefault();
    API.saveBook(body)
      .catch(err => console.log(err));
  };

  // switchPage = () => {
  //   if (this.state.searchPage) {
  //     // this.setState({ searchPage: false })
  //     this.loadBooks();
  //   } else {
  //     this.setState({ searchPage: true })
  //   }
  // }

  deleteBook = id => {
    console.log("delete book");
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data })
        console.log("res.data = " + res.data)
      }
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Header /><hr />
        <div>
          <BookSearch
            value={this.state.search}
            click={this.handleFormSubmit}
            change={this.handleInputChange}
          /><hr />
          <SearchResults
            results={this.state.searchResults}
            clickView={this.handleClickView}
            clickSave={this.handleClickSave}
          />
        </div>
      </div>
    )
  };
};

export default Search;