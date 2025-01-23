import React, { useState } from 'react';
import MovieCard from "../MoviePosterCard/PosterCard";
import './Search.css'

function Search() {
    const [movieSearch, setMovieSearch] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchType, setSearchType] = useState('title');

    const handleSearch = async () => {
        setMovieData([]); 
        setError(null);
        
        try {

            const response = await fetch(`http://localhost:8080/api/movies/search?searchString=${movieSearch}&searchType=${searchType}`, {
            });
            
            if (!response.ok) {
                throw new Error('Movie not found!');
            }

            const data = await response.json();
            setMovieData(data); 
            setError(null);    
        } catch (error) {
            setError(error.message); 
            setMovieData(null); 
        }
    };

    let searchMessage = ""
    if (hasSearched) {
        searchMessage = "No movies found. Try another search!"
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {  
            handleSearch();
        }
    };

    return (
        <div>
            <h1>Search for Movies</h1>

            <div className="button-container">
                <button 
                    onClick={() => setSearchType('title')} 
                    className={`button ${searchType === 'title' ? 'selected' : ''}`}
                >
                    Search by Title
                </button>
                <button 
                    onClick={() => setSearchType('person')} 
                    className={`button ${searchType === 'person' ? 'selected' : ''}`}
                >
                    Search by Person
                </button>
            </div>

            <input
                type="text"
                value={movieSearch}
                onChange={(e) => setMovieSearch(e.target.value)}
                placeholder="Enter movie title"
                onKeyDown={handleKeyDown}
            />
            <button className='search-button' onClick={handleSearch}>Search</button>

            {error && <p>{error}</p>}

            {movieData.length > 0 ? (
                <div id="movie-search">
                    {movieData.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p>{searchMessage}</p>
            )}
        </div>
    );
}

export default Search;