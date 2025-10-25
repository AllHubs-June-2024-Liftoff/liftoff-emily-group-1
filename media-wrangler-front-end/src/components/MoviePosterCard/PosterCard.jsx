import React, { useState, useEffect } from "react";
import "./PosterCard.css";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const { lists = [], setLists } = useListContext();

  const [newListName, setNewListName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8080/api/lists/user-lists?userId=${userId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then((data) => setLists(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching lists:", err));
  }, [userId, setLists]);

  const handlePosterClick = () => navigate(`/movies/${movie.id}`);

  const imageUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w780${movie.posterPath}`
    : fallbackImage;

  const handleAddClick = (e) => {
    if (!userId) {
      toast.info("Log in to save movies to a list.");
      return;
    }
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowAddListForm(false);
    setNewListName("");
  };

  const handleAddList = async () => {
    const name = newListName.trim();
    if (!name) {
      return toast.warn("Please enter a list name.");
    }
    if (lists.includes(name)) {
      return toast.info(`"${name}" already exists.`);
    }

    try {
      const res = await fetch("http://localhost:8080/api/lists/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, listName: name }),
      });

      if (res.ok) {
        setLists((prev) => [...prev, name]);
        handleMenuClose();
        toast.success(`List "${name}" added!`);
      } else {
        toast.error("Failed to add list.");
      }
    } catch (err) {
      console.error("Error adding list:", err);
      toast.error("Something went wrong while adding the list.");
    }
  };

  const handleSelectList = async (listName) => {
    try {
      const res = await fetch("http://localhost:8080/api/lists/add-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listName, movieId: movie.id, userId }),
      });

      if (res.ok) {
        toast.success(`Added to "${listName}".`);
      } else {
        toast.error("Failed to add movie to the list.");
      }
    } catch (err) {
      console.error("Error adding movie:", err);
      toast.error("Something went wrong while adding the movie.");
    } finally {
      handleMenuClose();
    }
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
            border:
              hoveredId === movie.id ? "2px solid rgb(99, 180, 176)" : "none",
          }}
        />
        <button className={styles.addButton} onClick={handleAddClick}>
          <StarIcon style={{ color: "white", fontSize: "20px" }} />
        </button>

        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
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
          {lists.map((listName, idx) => (
            <MenuItem
              key={`${listName}-${idx}`}
              onClick={() => handleSelectList(listName)}
              sx={menuItemStyles}
            >
              <GradeIcon sx={{ color: "#9e5231" }} /> {listName}
            </MenuItem>
          ))}

          {!showAddListForm ? (
            <MenuItem
              onClick={() => setShowAddListForm(true)}
              sx={menuItemStyles}
            >
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
                  "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={handleAddList}
                sx={{
                  backgroundColor: "#9e5231",
                  color: "white",
                  "&:hover": { backgroundColor: "#b8643f", opacity: 0.9 },
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
