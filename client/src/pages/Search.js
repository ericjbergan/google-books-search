import React, { Component } from 'react'
import Header from "../components/Header/Header";
import BookSearch from "../components/BookSearch/BookSearch";
import SearchResults from "../components/SearchResults/SearchResults"
import Saved from "../components/Saved/Saved"
import Nav from "../components/Nav";

import API from '../utils/API'

class Search extends Component {
  state = {
    search: "",
    searchResults: [],
    savedBooks: [],
    searchPage: true,
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

  switchPage = () => {
    if (this.state.searchPage) {
      // this.setState({ searchPage: false })
      this.loadBooks();
    } else {
      this.setState({ searchPage: true })
    }
  }

  deleteBook = id => {
    console.log("delete book");
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        {this.setState({ savedBooks: res.data.items, searchPage: false })
        console.log(res.body)}
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Nav switch={this.switchPage} />
        <Header /><hr />
        {this.state.searchPage ?
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
          :
          <div>
            < Saved saved={this.state.savedBooks} delete={this.deleteBook} />
          </div>
        }
      </div>
    )
  };
};

export default Search;