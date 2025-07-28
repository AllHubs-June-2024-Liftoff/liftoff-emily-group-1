import React, { useState, useEffect } from "react";
import './PosterCard.css';
import { useAuth } from "../../Services/AuthContext";
import { useListContext } from "../../Services/ListContext.jsx";
import fallbackImage from "../../../Resources/default-fallback-image.jpg";
import styles from "../../stylings/PosterCard.module.css";
import StarIcon from "@mui/icons-material/Star";
import GradeIcon from "@mui/icons-material/Grade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

const menuItemStyles = {
  fontWeight: "bold",
  borderRadius: "4px",
  color: "#9e5231",
  "&:hover": { backgroundColor: "#f6d8c3" },
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

function MovieCard({ movie }) {
  const { user } = useAuth();
  const userId = user?.id;
  const { lists, setLists } = useListContext();

  const [newListName, setNewListName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8080/api/lists/user-lists?userId=${userId}`)
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch"))
      .then(setLists)
      .catch(err => console.error("Error fetching lists:", err));
  }, [userId]);

  const handlePosterClick = () => navigate(`/movies/${movie.id}`);
  const imageUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w780${movie.posterPath}`
    : fallbackImage;

  const handleAddClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowAddListForm(false);
    setNewListName("");
  };

  const handleAddList = async () => {
    if (!newListName.trim() || lists.includes(newListName)) {
      return alert(`List "${newListName}" already exists or is invalid.`);
    }

    try {
      const res = await fetch("http://localhost:8080/api/lists/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, listName: newListName }),
      });

      if (res.ok) {
        setLists(prev => [...prev, newListName]);
        handleMenuClose();
        alert(`List "${newListName}" added!`);
      } else {
        alert("Failed to add list.");
      }
    } catch (err) {
      console.error("Error adding list:", err);
    }
  };

  const handleSelectList = async (listName) => {
    try {
      const res = await fetch("http://localhost:8080/api/lists/add-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listName, movieId: movie.id, userId }),
      });

      alert(res.ok ? `Movie added to ${listName}` : "Failed to add movie.");
    } catch (err) {
      console.error("Error adding movie:", err);
    }
    handleMenuClose();
  };

  return (
    <div id="movie-search">
      <div
        key={movie.id}
        className={styles.posterContainer}
        onMouseOver={() => setHoveredId(movie.id)}
        onMouseOut={() => setHoveredId(null)}
      >
        <img
          onClick={handlePosterClick}
          title={movie.title}
          src={imageUrl}
          alt={movie.title}
          className={styles.posterImage}
          style={{
            border: hoveredId === movie.id ? "2px solid rgb(99, 180, 176)" : "none",
          }}
        />
        <button className={styles.addButton} onClick={handleAddClick}>
          <StarIcon style={{ color: "white", fontSize: "20px" }} />
        </button>

        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}
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
          {/* Static Favorites */}
          

          {/* User-created Lists */}
          {lists.map((listName, idx) => (
            <MenuItem key={idx} onClick={() => handleSelectList(listName)} sx={menuItemStyles}>
              <GradeIcon sx={{ color: "#9e5231" }} /> {listName}
            </MenuItem>
          ))}

          {/* Add New List */}
          {!showAddListForm ? (
            <MenuItem onClick={() => setShowAddListForm(true)} sx={menuItemStyles}>
              + Add List
            </MenuItem>
          ) : (
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
      </div>
    </div>
  );
}

export default MovieCard;



/*
NOTE: The width and height can be adjusted. We probably want a smaller poster size for the poster grid that will display the movie-cards and possibly to attach to the movie-review-form
We probably want an image a bit larger for the movie-detail-card when we are targeting in on one specific movie 


NOTE: We may not want to display the movie title in the poster grid (or horizontal display) because the titles will not allow for a good flow with the various lengths. 

NOTE: We just need to decide if we want the results to list horizontal or vertically. For the homepage, if we are viewing the trending movies I think horizontally would be best, but for the search results a vertical display might be nice. No preference either way

-----
NOTE: Make sure not to add () after clickHandler inside the {} because it would then be calling the function instead of acting as a function
*/
