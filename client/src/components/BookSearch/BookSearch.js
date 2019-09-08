import React from 'react';
import './style.css';

function BookSearch(props) {
    return (
        <div className="search">
            <label>
                <input
                    value={props.search}
                    onChange={props.change}
                    name="books"
                    type="text"
                    className="form-control"
                    placeholder="Enter a book to search"
                    size="350"
                 />
                <button type="search" onClick={props.click}>Search</button>
                </label>

        </div>
    )
}

export default BookSearch;