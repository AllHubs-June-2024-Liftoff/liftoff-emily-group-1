import React, { useState, useEffect } from "react";
import { useAuth } from "../../Services/AuthContext";
import "./UpcomingReleases.css";
import StarIcon from "@mui/icons-material/Star";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function AddEventForm() {
  const { user } = useAuth();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); 
  const [selectedMovie, setSelectedMovie] = useState(null);

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
      const response = await fetch("http://localhost:8080/events/add", {
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
        alert(`"${movie.title}" has been added to your Calendar!`);
      } else {
        alert("Failed to add movie to your Calendar.");
      }
    } catch (error) {
      console.error("Error adding movie to events:", error);
      alert("An error occurred while adding the movie to your events.");
    }

    handleMenuClose();
  };

  const handleMenuOpen = (event, movie) => {
    setAnchorEl(event.currentTarget);
    setSelectedMovie(movie);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMovie(null);
  };

  return (
    <div className="upcoming-movie-container">
      <h2>Upcoming Movies</h2>

      <div id="upcoming-movies">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="upcoming-poster">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`Poster of ${movie.title}`}
              className="upcoming-poster-image"
            />
            <div>
              <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            <button
              className="addToCalendar"
              onClick={(event) => handleMenuOpen(event, movie)}
            >
              <StarIcon style={{ color: "white", fontSize: "20px" }} />
            </button>
          </div>
        ))}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            padding: "8px",
            borderRadius: "8px",
            backgroundColor: "#f4e1d2",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <MenuItem
          onClick={() => handleAddMovieToEvents(selectedMovie)}
          sx={{
            fontWeight: "bold",
            color: "#9e5231",
            "&:hover": {
              backgroundColor: "#f6d8c3",
            },
          }}
        >
          Add to Calendar
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AddEventForm;
