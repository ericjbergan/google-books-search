import React, { Component } from 'react'
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import BookSearch from "../components/BookSearch/BookSearch";
import SearchResults from "../components/SearchResults/SearchResults"
import Axios from 'axios';
import API from '../Utilities/API'

class Search extends Component {
    state = {
        search: "",
        searchResults: []
    }

    handleInputChange = event => {
        const noSpaces = event.target.value.replace(/\s/g, '');
        this.setState({ search: noSpaces });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        Axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.search)
        // API.bookSearch(this.state.search)
            .then(res => {
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                this.setState({ searchResults: res.data.items, error: "" });
            })
            .catch(err => this.setState({ error: err.message }));
    }

    handleClickSave = (bookID, title, authors, description, image) => {
        // event.preventDefault();
        API.saveBook({
            key: bookID,
            bookID: bookID,
            title: title,
            author: authors,
            description: description,
            image: image
        })
            // .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Navbar />
                <Header /><hr />
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
        )
    };
};


export default Search;