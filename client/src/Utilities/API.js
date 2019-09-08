import axios from "axios";

// Export an object containing methods we'll use for accessing the Google Books API

export default {
    getBooks: function (query) {
        console.log("https://www.googleapis.com/books/v1/volumes?q=" + query);
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query);
    }
}
