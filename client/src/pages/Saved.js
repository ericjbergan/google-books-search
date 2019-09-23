import React, { Component } from "react";
import Header from "../components/Header/Header"
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";

class Books extends Component {
    state = {
        books: [],
        title: "",
        authors: "",
        description: "",
        image: ""
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res => {
                this.setState({ books: res.data, title: "", authors: "", description: "", image: "" })
                console.log("res.data: " + res.data)
                console.log(this.state)
            })
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                    <Header /><hr />
                    {this.state.books.length ? (
                        <List>
                            {this.state.books.map(book => (
                                <ListItem key={book._id}>
                                    <Link to={"/books/" + book._id}>
                                        <strong>
                                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                         <p className="title"> {book.title}</p> 
                                         <p className="authors">by {book.authors}</p>
                                         <p>{book.description}</p>
                                        </strong>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
            </div>
        );
    }
}

export default Books;
