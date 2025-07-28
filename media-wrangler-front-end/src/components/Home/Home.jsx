import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useAuth } from "../../Services/AuthContext";
import { useListContext } from "../../Services/ListContext.jsx";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import { useFetchMovies } from "../../Services/useFetchMovies";
import MovieListMenu from "../MovieListMenu";

const HomePage = () => {
  const navigate = useNavigate();
  const { upcomingMovies, popularMovies, error } = useFetchMovies();
  const { user } = useAuth();
  const userId = user?.id;
  const { lists, setLists } = useListContext();
  const [newListName, setNewListName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [upcomingVisibleCount, setUpcomingVisibleCount] = useState(5);
  const [popularVisibleCount, setPopularVisibleCount] = useState(5);



  useEffect(() => {
    const fetchLists = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:8080/api/lists/user-lists?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error("Failed to fetch lists.");
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, [userId]);

  const handlePosterClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const handleAddClick = (event, movie) => {
    if (!userId) {
      alert("You must be logged in to add movies to a list.");
      return;
    }
    setAnchorEl(event.currentTarget);
    setSelectedMovie(movie);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowAddListForm(false);
  };

  const handleAddList = async () => {
    if (newListName.trim() && !lists.includes(newListName)) {
      const payload = { userId, listName: newListName };

      try {
        const response = await fetch("http://localhost:8080/api/lists/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setLists((prevLists) => [...prevLists, newListName]);
          setNewListName("");
          setShowAddListForm(false);
          alert(`List "${newListName}" added!`);
        } else {
          alert("Failed to add list.");
        }
      } catch (error) {
        console.error("Error adding list:", error);
      }
    } else if (lists.includes(newListName)) {
      alert(`The list "${newListName}" already exists.`);
    }
  };

  const handleSelectList = (listName) => {
    if (!selectedMovie) return;
    const payload = { listName, movieId: selectedMovie.id, userId };

    fetch("http://localhost:8080/api/lists/add-movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Movie added to ${listName}`);
        } else {
          alert("Failed to add movie to the list.");
        }
      })
      .catch((error) => console.error("Error:", error));

    setAnchorEl(null);
  };

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
    <>
        <div className="home-container">
            <div className="home-hero-section">
                <div className="home-hero-overlay">
                    <h1 className="home-welcome-title">Welcome to Media Wrangler</h1>
                    <p className="home-tagline">Wrangle Up a Good Movie!</p>
                    <div className="home-hero-buttons">
                        <button className="home-get-started-button" onClick={() => navigate("/register")}>Get Started</button>
                        <button className="home-search-movies-button" onClick={() => navigate("/search")}>Search Movies</button>
                    </div>
                </div>
            </div>
        </div>

        

        <div className="features-section">
          <div className="features-grid">
            <div className="feature-card">
                <h3>Create Customized Lists</h3>
                <p>Organize movies you want to watch and have seen.</p>
            </div>
            <div className="feature-card">
                <h3>Add to Your Calendar</h3>
                <p>Never miss a release. Add upcoming movies to your calendar.</p>
            </div>
            <div className="feature-card">
                <h3>Read & Write Reviews</h3>
                <p>Share your thoughts or read what others think.</p>
            </div>
            <div className="feature-card">
                <h3>Engage in Discussions</h3>
                <p>Join the conversation and connect with fellow movie enthusiasts.</p>
            </div>
          </div>
        </div>

      <div className="home-container">
        <div className="home-movie-sections">
          <div className="home-movie-sections">
            <MovieCarousel
              title="Upcoming Movies"
              movies={upcomingMovies.slice(0, upcomingVisibleCount)}
              onPosterClick={handlePosterClick}
              onAddClick={handleAddMovieToEvents} 
              buttonType="calendar"
            />
            {upcomingMovies.length > upcomingVisibleCount && (
              <div className="view-more-container">
                <button className="view-more-button" onClick={() => navigate("/coming-soon")}>
                  View More Upcoming Movies
                </button>
              </div>
            )}

            <MovieCarousel
              title="Popular Movies"
              movies={popularMovies.slice(0, popularVisibleCount)}
              onPosterClick={handlePosterClick}
              onAddClick={handleAddClick} 
              buttonType="list"
            />
            {popularMovies.length > popularVisibleCount && (
              <div className="view-more-container">
                <button className="view-more-button" onClick={() => navigate("/search")}>
                  View More Popular Movies
                </button>
              </div>
            )}
          </div>
        </div>


      <MovieListMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        lists={lists}
        selectedMovie={selectedMovie}
        showAddListForm={showAddListForm}
        setShowAddListForm={setShowAddListForm}
        newListName={newListName}
        setNewListName={setNewListName}
        onAddList={handleAddList}
        onSelectList={handleSelectList}
      />
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

export default HomePage;
