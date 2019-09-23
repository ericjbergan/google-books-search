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

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log("response.data: " + this.state.books)
        this.setState({ books: res.data, title: "", authors: "", description: "", image: "" })
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
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

//   render() {
//     return (
//       <Container fluid>
//         <Row>
//           <Col size="md-6">
//             <Jumbotron>
//               <h1>What Books Should I Read?</h1>
//             </Jumbotron>
//             <form>
//               <Input
//                 value={this.state.title}
//                 onChange={this.handleInputChange}
//                 name="title"
//                 placeholder="Title (required)"
//               />
//               <Input
//                 value={this.state.author}
//                 onChange={this.handleInputChange}
//                 name="author"
//                 placeholder="Author (required)"
//               />
//               <TextArea
//                 value={this.state.synopsis}
//                 onChange={this.handleInputChange}
//                 name="synopsis"
//                 placeholder="Synopsis (Optional)"
//               />
//               <FormBtn
//                 disabled={!(this.state.author && this.state.title)}
//                 onClick={this.handleFormSubmit}
//               >
//                 Submit Book
//               </FormBtn>
//             </form>
//           </Col>
//           <Col size="md-6 sm-12">
//             <Jumbotron>
//               <h1>Books On My List</h1>
//             </Jumbotron>
//             {this.state.books.length ? (
//               <List>
//                 {this.state.books.map(book => (
//                   <ListItem key={book._id}>
//                     <Link to={"/books/" + book._id}>
//                       <strong>
//                         {book.title} by {book.author}
//                       </strong>
//                     </Link>
//                     <DeleteBtn onClick={() => this.deleteBook(book._id)} />
//                   </ListItem>
//                 ))}
//               </List>
//             ) : (
//               <h3>No Results to Display</h3>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

export default Search;
