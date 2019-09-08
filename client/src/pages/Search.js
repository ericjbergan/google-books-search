import React, { Component } from 'react'
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import BookSearch from "../components/BookSearch/BookSearch";
import SearchResults from "../components/SearchResults/SearchResults"
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
        API.getBooks(this.state.search)
            .then(res => {
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                this.setState({ searchResults: res.data.items, error: "" });
            })
            .catch(err => this.setState({ error: err.message }));
    }

    handleClickSave = event => {
        event.preventDefault();
        API.saveBook({
            title: this.state.title,
            author: this.state.author,
            synopsis: this.state.synopsis
        })
            .catch(err => console.log(err));
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