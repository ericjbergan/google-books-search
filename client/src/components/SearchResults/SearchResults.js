import React from "react";
import "./style.css";

function SearchResults(props) {
    // console.log(props.results);
    return (
        <ul className="list-group search-results">
            {props.results.map(result => {
                
               return <li key={result.accessInfo.id} className="list-group-item">
                    <div>
                        <h4>{result.volumeInfo.title}</h4>
                        <div>
                            <button
                                className="searchPageButtons"
                                onClick = {() => props.clickSave({
                                    
                                    title: result.volumeInfo.title,
                                    authors: result.volumeInfo.authors,
                                    imageURL: result.volumeInfo.imageLinks.thumbnail,
                                    description: result.volumeInfo.description
                                })}>
                                Save
                            </button>
                            <a href={result.volumeInfo.infoLink}
                                target="_blank"
                                rel="noopener noreferrer">
                                <button type="button" className="searchPageButtons">View</button>
                            </a>

                        </div>
                    </div>
                    <p>{result.volumeInfo.authors}</p>
                    <div>
                        <img alt="Book" src={result.volumeInfo.imageLinks.thumbnail} className="img-fluid" />
                        <p>{result.volumeInfo.description}</p>
                    </div>
                </li>
            })}
        </ul>
    );
}

export default SearchResults;