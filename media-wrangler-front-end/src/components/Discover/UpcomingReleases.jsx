import React, { useState, useEffect } from "react";
import { useAuth } from "../../Services/AuthContext";
import "./UpcomingReleases.css";
import StarIcon from "@mui/icons-material/Star";

function AddEventForm() {
  const { user } = useAuth();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const apiKey = "1ae7a70b471c9eb7d389671747750ad0";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming movies.");
        }

        const data = await response.json();
        setUpcomingMovies(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const handleAddMovieToEvents = async (movie) => {
    if (!user || !user.id) {
      alert("User is not logged in or user ID is missing.");
      return;
    }

    const formattedStart = `${movie.release_date}T00:00:00`;
    const formattedEnd = `${movie.release_date}T23:59:59`;

    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: movie.title,
          start: formattedStart,
          end: formattedEnd,
          userId: user.id,
        }),
      });

      if (response.ok) {
        alert(`"${movie.title}" has been added to your events!`);
      } else {
        alert("Failed to add movie to your events.");
      }
    } catch (error) {
      console.error("Error adding movie to events:", error);
      alert("An error occurred while adding the movie to your events.");
    }
  };

  return (
    <div className="addEventForm-container">
      <h2>Upcoming Movies</h2>
      {error && <p>{error}</p>}

      <div id="movie-search" className="movie-search">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="posterContainer">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`Poster of ${movie.title}`}
              className="posterImage"
            />
            <div>
              <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            <button
              className="addButton"
              onClick={() => handleAddMovieToEvents(movie)}
            >
              <StarIcon style={{ color: "white", fontSize: "20px" }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddEventForm;

