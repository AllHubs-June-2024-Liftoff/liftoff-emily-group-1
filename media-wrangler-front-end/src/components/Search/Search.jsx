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

        const validCharacters = /^[a-zA-Z0-9\s]*$/;

        if (!validCharacters.test(movieSearch)) {
            setError('Invalid characters in search. Please use only letters, numbers, and spaces.');
            return;
        }
        
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
        <>
        <div className="search-container">
            <div className="search-hero-section">
                <div className="search-hero-overlay">
                    <h1 className="search-welcome-title">Search For Movies</h1>
                    <div className="search-button-container">
                        <button 
                            onClick={() => setSearchType('title')} 
                            className={`search-title-button ${searchType === 'title' ? 'selected' : ''}`}
                        >
                            Search by Title
                        </button>
                        <button 
                            onClick={() => setSearchType('person')} 
                            className={`search-title-button ${searchType === 'person' ? 'selected' : ''}`}
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
                        className='search-input'
                    />
                    <button className='search-button' onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>

        <div className='search-movie-container'>
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
        <footer className="footer">
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>© {new Date().getFullYear()} Media Wrangler</p>
        <div className="about-us">
          <a href="/about-us">About PurpleTONE</a>
        </div>
      </footer>
      </>
    );
}

export default Search;