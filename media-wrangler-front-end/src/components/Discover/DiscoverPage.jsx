import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../MoviePosterCard/PosterCard';
import '../../stylings/DiscoverPage.css';

const DiscoverPage = () => {
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];

  const navigate = useNavigate();

  const [andOrChar, setAndOrChar] = useState(',');
  const [selectedGenres, setSelectedGenres] = useState('');
  const [afterYear, setAfterYear] = useState('');
  const [beforeYear, setBeforeYear] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);
  const [randomId, setRandomId] = useState(null);

  const handleToggle = (id) => {
    let updatedGenres = selectedGenres.split(andOrChar).map((str) => str.trim()).filter(Boolean);
    if (updatedGenres.includes(String(id))) {
      updatedGenres = updatedGenres.filter((genreId) => genreId !== String(id));
    } else {
      updatedGenres.push(String(id));
    }
    setSelectedGenres(updatedGenres.join(andOrChar));
  };

  const handleDiscover = async () => {
    setMovieData([]);
    setError(null);

    try {
      const encodedGenres = encodeURIComponent(selectedGenres);
      const response = await fetch(
        `http://localhost:8080/api/movies/discover?genres=${encodedGenres}&afterYear=${afterYear}&beforeYear=${beforeYear}`
      );

      if (!response.ok) {
        throw new Error('Movie not found!');
      }

      const data = await response.json();
      setMovieData(data);
      setError(null);

      if (data.length !== 0) {
        setRandomId(data[Math.floor(Math.random() * data.length)].id);
      }
    } catch (error) {
      setError(error.message);
      setMovieData([]);
    }
  };

  useEffect(() => {
    if (selectedGenres) {
      handleDiscover();
    }
  }, [selectedGenres]);

  const handleToggleButton = () => {
    setAndOrChar((prevChar) => {
      const newChar = prevChar === ',' ? '|' : ',';
      setSelectedGenres(selectedGenres.replaceAll(prevChar, newChar));
      return newChar;
    });
  };

  const handleRandomButton = () => {
    if (randomId != null) {
      navigate(`/movies/${randomId}`);
    } else {
      alert("Pick a genre!");
    };
  };

  return (
    <>
      <div className="discover-container">
        <div className="discover-hero-section">
          <div className="discover-hero-overlay">
            <h1 className="discover-welcome-title">Discover a Movie to Watch</h1> <div className="yearRange">

              <div>
              <label className='discover-label' htmlFor="afterYear">Released After</label>
              <input
                type="number"
                id="afterYear"
                value={afterYear}
                onChange={(e) => {
                  setAfterYear(e.target.value);
                  handleDiscover();
                }}
                placeholder="Year"
                min={1880}
                max={2500}
              />
              </div>

              <div>
              <label className='discover-label' htmlFor="beforeYear">Released Before</label>
              <input
                type="number"
                id="beforeYear"
                value={beforeYear}
                onChange={(e) => {
                  setBeforeYear(e.target.value);
                  handleDiscover();
                }}
                placeholder="Year"
                min={1880}
                max={2500}
              />
              </div>
            </div>

            <div className='button'>
              <button onClick={() => handleRandomButton()}>Pick me a Movie!</button>
            </div>

            {error && <div className="error">{error}</div>}
            

            <div className="discover-button-group">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleToggle(genre.id)}
                  className={`button genre-button ${selectedGenres.includes(String(genre.id)) ? 'selected' : ''}`}
                >
                  {genre.name}
                </button>
              ))}
            </div>

           

          </div>
        </div>
      </div>

      <div>
        <div id="discovered-movies">
          {movieData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
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
};

export default DiscoverPage;