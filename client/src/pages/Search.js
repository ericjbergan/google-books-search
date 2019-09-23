import React, { Component } from "react";
import Header from "../components/Header/Header";
import BookSearch from "../components/BookSearch/BookSearch";
import SearchResults from "../components/SearchResults/SearchResults"
import API from "../utils/API";

class Search extends Component {
  state = {
    search: "",
    searchResults: [],
    books: [],
    title: "",
    authors: "",
    description: "",
    image: ""
  };

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
    console.log("body: " + body.imageURL);
    // event.preventDefault();
    API.saveBook(body)
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
