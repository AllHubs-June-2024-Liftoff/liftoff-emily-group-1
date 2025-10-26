import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useAuth } from "../../Services/AuthContext";
import { useListContext } from "../../Services/ListContext.jsx";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import { useFetchMovies } from "../../Services/useFetchMovies";
import { toast } from "react-toastify";

// MUI (no Menu used)
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GradeIcon from "@mui/icons-material/Grade";

const itemSx = {
  fontWeight: "bold",
  borderRadius: "6px",
  color: "#9e5231",
  "&:hover": { backgroundColor: "#f6d8c3" },
};

const HomePage = () => {
  const navigate = useNavigate();
  const { upcomingMovies, popularMovies, error } = useFetchMovies();
  const { user } = useAuth();
  const userId = user?.id;

  const { lists, setLists } = useListContext();

  // state for list popover (replaces MovieListMenu)
  const [listAnchor, setListAnchor] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // inline add-form state
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const inputRef = React.useRef(null);

  // misc UI
  const [upcomingVisibleCount, setUpcomingVisibleCount] = useState(5);
  const [popularVisibleCount, setPopularVisibleCount] = useState(5);

  // fetch user lists
  useEffect(() => {
    const fetchLists = async () => {
      if (!userId) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/lists/user-lists?userId=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setLists(Array.isArray(data) ? data : []);
        } else {
          toast.error("Failed to fetch your lists.");
        }
      } catch (err) {
        console.error("Error fetching lists:", err);
        toast.error("Couldn’t load lists. Please try again.");
      }
    };
    fetchLists();
  }, [userId, setLists]);

  // focus input when add form appears
  useEffect(() => {
    if (showAddListForm) {
      const id = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(id);
    }
  }, [showAddListForm]);

  const handlePosterClick = (movie) => navigate(`/movies/${movie.id}`);

  // Open popover to add a movie to list (popular carousel uses this)
  const openListPopover = (event, movie) => {
    if (!userId) {
      toast.info("Log in to add movies to a list.");
      return;
    }
    setSelectedMovie(movie);
    setListAnchor(event.currentTarget);
  };

  const closeListPopover = () => {
    setListAnchor(null);
    setSelectedMovie(null);
    setShowAddListForm(false);
    setNewListName("");
  };

  // Add list (case-insensitive duplicate check)
  const handleAddList = async () => {
    const name = newListName.trim();
    if (!name) return toast.warn("Please enter a list name.");
    if (lists.some((l) => l.toLowerCase() === name.toLowerCase())) {
      return toast.info(`"${name}" already exists.`);
    }

    try {
      const response = await fetch("http://localhost:8080/api/lists/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, listName: name }),
      });

      if (!response.ok) throw new Error("add-list-failed");
      setLists((prev) => [...prev, name]);
      toast.success(`List "${name}" added!`);
      setShowAddListForm(false);
      setNewListName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add list.");
    }
  };

  // Add selected movie to chosen list
  const handleSelectList = async (listName) => {
    if (!selectedMovie) return;
    try {
      const res = await fetch("http://localhost:8080/api/lists/add-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listName,
          movieId: selectedMovie.id,
          userId,
        }),
      });
      if (!res.ok) throw new Error("add-movie-failed");
      toast.success(`Added to ${listName}.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add movie to the list.");
    } finally {
      closeListPopover();
    }
  };

  // Add movie to calendar (upcoming carousel uses this)
  const handleAddMovieToEvents = async (movie) => {
    if (!user || !user.id) {
      toast.info("Log in to add to your calendar.");
      return;
    }
    const formattedStart = `${movie.release_date}T00:00:00`;
    const formattedEnd = `${movie.release_date}T23:59:59`;

    try {
      const res = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: movie.title,
          start: formattedStart,
          end: formattedEnd,
          userId: user.id,
          tmdbId: movie.id,
          posterPath: movie.poster_path || null,
          overview: movie.overview || null,
        }),
      });

      if (res.status === 409) {
        toast.info("Already on your calendar for that day.");
        return;
      }
      if (res.ok) {
        toast.success(`"${movie.title}" added to your calendar!`);
      } else {
        toast.error("Failed to add movie to your calendar.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Could not add to calendar.");
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
              <button
                className="home-get-started-button"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
              <button
                className="home-search-movies-button"
                onClick={() => navigate("/search")}
              >
                Search Movies
              </button>
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
          <MovieCarousel
            title="Upcoming Movies"
            movies={upcomingMovies.slice(0, upcomingVisibleCount)}
            onPosterClick={handlePosterClick}
            onAddClick={handleAddMovieToEvents}
            buttonType="calendar"
          />
          {upcomingMovies.length > upcomingVisibleCount && (
            <div className="view-more-container">
              <button
                className="view-more-button"
                onClick={() => navigate("/coming-soon")}
              >
                View More Upcoming Movies
              </button>
            </div>
          )}

          <MovieCarousel
            title="Popular Movies"
            movies={popularMovies.slice(0, popularVisibleCount)}
            onPosterClick={handlePosterClick}
            onAddClick={openListPopover} // ⬅️ opens our Popover (no Menu)
            buttonType="list"
          />
          {popularMovies.length > popularVisibleCount && (
            <div className="view-more-container">
              <button
                className="view-more-button"
                onClick={() => navigate("/search")}
              >
                View More Popular Movies
              </button>
            </div>
          )}
        </div>

        {/* === Single Popover for lists + add form (no Menu anywhere) === */}
        <Popover
          open={Boolean(listAnchor)}
          anchorEl={listAnchor}
          onClose={closeListPopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              p: 1.5,
              backgroundColor: "#f4e1d2",
              borderRadius: "10px",
              minWidth: 280,
            },
            onKeyDown: (e) => e.stopPropagation(),
            onKeyDownCapture: (e) => e.stopPropagation(),
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            onKeyDown={(e) => e.stopPropagation()}
            onKeyDownCapture={(e) => e.stopPropagation()}
          >
            <List dense disablePadding>
              {lists.map((listName, idx) => (
                <ListItemButton
                  key={`${listName}-${idx}`}
                  onClick={() => handleSelectList(listName)}
                  sx={itemSx}
                >
                  <ListItemIcon sx={{ minWidth: 34 }}>
                    <GradeIcon sx={{ color: "#9e5231" }} />
                  </ListItemIcon>
                  <ListItemText primary={listName} />
                </ListItemButton>
              ))}
            </List>

            <Divider sx={{ my: 1 }} />

            {!showAddListForm ? (
              <Button
                onClick={() => setShowAddListForm(true)}
                sx={{
                  backgroundColor: "#9e5231",
                  color: "white",
                  "&:hover": { backgroundColor: "#b8643f", opacity: 0.9 },
                  borderRadius: "8px",
                  textTransform: "capitalize",
                }}
                variant="contained"
                size="small"
              >
                + Add List
              </Button>
            ) : (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyDownCapture={(e) => e.stopPropagation()}
              >
                <TextField
                  label="New List Name"
                  variant="outlined"
                  size="small"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  inputRef={inputRef}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                  }}
                />
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  <Button size="small" onClick={() => setShowAddListForm(false)}>
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleAddList}
                    sx={{
                      backgroundColor: "#9e5231",
                      color: "white",
                      "&:hover": { backgroundColor: "#b8643f", opacity: 0.9 },
                      borderRadius: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Popover>
      </div>

      <footer className="footer">
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p>© {new Date().getFullYear()} Media Wrangler</p>
        <div className="about-us">
          <a href="/about-us">About PurpleTONE</a>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
