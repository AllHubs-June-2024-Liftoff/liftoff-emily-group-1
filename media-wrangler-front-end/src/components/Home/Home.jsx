import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import StarIcon from "@mui/icons-material/Star";
import GradeIcon from "@mui/icons-material/Grade";
import { useAuth } from "../../Services/AuthContext";
import { useLists } from "../../Services/ListContext.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const HomePage = () => {
  const navigate = useNavigate();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userId = user?.id;
  const { lists, setLists } = useLists();
  const [newListName, setNewListName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchMovies = async (type, setState) => {
      try {
        const apiKey = "1ae7a70b471c9eb7d389671747750ad0";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} movies.`);
        }

        const data = await response.json();
        setState(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies("upcoming", setUpcomingMovies);
    fetchMovies("popular", setPopularMovies);
  }, []);

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
            <div className="feature-card" onClick={() => navigate("/my-lists")}>
                <h3>Create Customized Lists</h3>
                <p>Organize movies you want to watch and have seen.</p>
            </div>
            <div className="feature-card" onClick={() => navigate("/calendar")}>
                <h3>Add to Your Calendar</h3>
                <p>Never miss a release. Add upcoming movies to your calendar.</p>
            </div>
            <div className="feature-card" onClick={() => navigate("/reviews")}>
                <h3>Read & Write Reviews</h3>
                <p>Share your thoughts or read what others think.</p>
            </div>
            <div className="feature-card" onClick={() => navigate("/questions")}>
                <h3>Engage in Discussions</h3>
                <p>Join the conversation and connect with fellow movie enthusiasts.</p>
            </div>
          </div>
        </div>

      <div className="home-container">
      <div className="home-movie-sections">
  <div className="home-upcoming-container">
    <h2 className="home-upcoming-title">Upcoming Movies</h2>
    {error && <p>{error}</p>}

    <div id="home-upcoming-movie-search">
      {upcomingMovies.slice(0, 5).map((movie) => (
        <div key={movie.id} className="home-upcoming-poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`Poster of ${movie.title}`}
            className="home-upcoming-poster-image"
            onClick={() => handlePosterClick(movie)}
          />
          <button
            className="home-upcoming-add-button"
            onClick={(event) => handleAddClick(event, movie)}
          >
            <StarIcon style={{ color: "white", fontSize: "20px" }} />
          </button>
        </div>
      ))}
    </div>
    <button className="home-view-more-button" onClick={() => navigate("/coming-soon")}>
      View More
    </button>
  </div>

  <div className="home-popular-container">
    <h2 className="home-popular-title">Popular Movies</h2>
    {error && <p>{error}</p>}

    <div id="home-popular-movie-search">
      {popularMovies.slice(0, 5).map((movie) => (
        <div key={movie.id} className="home-popular-poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`Poster of ${movie.title}`}
            className="home-popular-poster-image"
            onClick={() => handlePosterClick(movie)}
          />
          <button
            className="home-popular-add-button"
            onClick={(event) => handleAddClick(event, movie)}
          >
            <StarIcon style={{ color: "white", fontSize: "20px" }} />
          </button>
        </div>
      ))}
    </div>
    <button className="home-view-more-button" onClick={() => navigate("/search")}>
      Search More
    </button>
  </div>
</div>


      {anchorEl && (
       <Menu
       anchorEl={anchorEl}
       open={Boolean(anchorEl)}
       onClose={handleMenuClose}
       PaperProps={{
         style: {
           padding: "16px",
           borderRadius: "8px",
           backgroundColor: "#f4e1d2",
           boxShadow: "none",
           border: "none",
         },
       }}
     >
       <MenuItem
         onClick={() => handleSelectList("Favorites")}
         sx={{
           fontWeight: "bold",
           borderRadius: "4px",
           color: "#9e5231",
           "&:hover": {
             backgroundColor: "#f6d8c3",
           },
           display: "flex",
           alignItems: "center",
           gap: "8px",
         }}
       >
          <GradeIcon sx={{ color: "#9e5231" }} /> Favorites
        </MenuItem>

       {lists.map((listName, index) => (
        <MenuItem
        key={index}
        onClick={() => handleSelectList(listName)}
        sx={{
          fontWeight: "bold",
          borderRadius: "4px",
          color: "#9e5231",
          "&:hover": {
            backgroundColor: "#f6d8c3",
          },
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        >
          <GradeIcon sx={{ color: "#9e5231" }} /> {listName}
        </MenuItem>
        ))}

       {!showAddListForm && (
         <MenuItem
           onClick={() => setShowAddListForm(true)}
           sx={{
             fontWeight: "bold",
             borderRadius: "4px",
             color: "#9e5231",
             "&:hover": {
               backgroundColor: "#f6d8c3",
             },
           }}
         >
           + Add List
         </MenuItem>
       )}

       {showAddListForm && (
         <Box
           sx={{
             display: "flex",
             flexDirection: "column",
             gap: "8px",
             alignItems: "center",
             padding: "8px",
             backgroundColor: "#f4e1d2",
             borderRadius: "8px",
           }}
         >
           <TextField
             label="New List Name"
             variant="outlined"
             size="small"
             value={newListName}
             onChange={(e) => setNewListName(e.target.value)}
             sx={{
               width: "200px",
               "& .MuiOutlinedInput-root": {
                 borderRadius: "16px",
               },
             }}
           />
           <Button
             variant="contained"
             size="small"
             onClick={handleAddList}
             sx={{
               backgroundColor: "#9e5231",
               color: "white",
               "&:hover": {
                 backgroundColor: "#b8643f",
                 opacity: 0.9,
               },
               borderRadius: "8px",
               textTransform: "capitalize",
             }}
           >
             Add List
           </Button>
         </Box>
       )}
     </Menu>
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
};

export default HomePage;
