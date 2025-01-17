import React, { useState } from 'react';
import MovieDetailCard from '../MovieDetails/MovieDetailCard';

function MovieSearch() {
    const [movieTitle, setMovieTitle] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setMovieData(null); 
        setError(null); 

        try {
          
            const response = await fetch(`http://localhost:8080/api/movies/search?title=${movieTitle}`);

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
                    <MovieDetailCard
                        id={movieData.id}
                        poster={movieData.posterPath}
                        title={movieData.title}
                        releaseDate={movieData.releaseDate}
                        rating={movieData.rating} // maybe we should only use our rating stats and not the one from API????
                        // director={movieData.director}  // Director -- not seeing Director given as property
                        overview={movieData.overview}
                        genre={movieData.genres}  // not seeing Genres given as property
                />
                </div>
            )}
        </div>
    );
}

export default MovieSearch;
