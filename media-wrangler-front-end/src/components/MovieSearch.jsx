import React, { useState } from 'react';
import MovieDetailCard from './MovieDetailCard/MovieDetailCard';

function MovieSearch() {
    const [movieTitle, setMovieTitle] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setMovieData(null); // Reset previous movie data before making a new request
        setError(null); // Reset previous error message
        
        try {
            // GET request to the backend API
            const response = await fetch(`http://localhost:8080/api/movies/search?title=${movieTitle}`);
            
            if (!response.ok) {
                throw new Error('Movie not found!');
            }

            // Parsing the response as JSON
            const data = await response.json();
            setMovieData(data);  // Save the data to state
            setError(null);       // Reset any previous errors
        } catch (error) {
            setError(error.message); // Handle error
            setMovieData(null); // Clear any previous movie data
        }
    };

    return (
        <div>
            <h1>Search for a Movie</h1>
            <input
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="Enter movie title"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p>{error}</p>}

            {movieData && (
                <div>
                    <h2>{movieData.title}</h2>
                    <p>{movieData.overview}</p>
                    <p>Release Date: {movieData.releaseDate}</p>
                </div>
            )}
        </div>
    );
}

export default MovieSearch;
