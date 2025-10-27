import React, { useState, useEffect } from "react";
import "./PosterCard.css";
import { useAuth } from "../../Services/AuthContext";
import { useListContext } from "../../Services/ListContext.jsx";
import fallbackImage from "../../../Resources/default-fallback-image.jpg";
import styles from "../../stylings/PosterCard.module.css";
import StarIcon from "@mui/icons-material/Star";
import GradeIcon from "@mui/icons-material/Grade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const itemSx = {
  fontWeight: "bold",
  borderRadius: "6px",
  color: "#9e5231",
  "&:hover": { backgroundColor: "#f6d8c3" },
};

function MovieCard({ movie }) {
  const { user } = useAuth();
  const userId = user?.id;
  const { lists = [], setLists } = useListContext();

  const [newListName, setNewListName] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const [popAnchor, setPopAnchor] = useState(null);
  const [showAddListForm, setShowAddListForm] = useState(false);

  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showAddListForm) {
      const id = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(id);
    }
  }, [showAddListForm]);

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

  const openPopover = (e) => {
    if (!userId) {
      toast.info("Log in to save movies to a list.");
      return;
    }
    setPopAnchor(e.currentTarget);
  };

  const closePopover = () => {
    setPopAnchor(null);
    setShowAddListForm(false);
    setNewListName("");
  };

  const handleAddList = async () => {
    const name = newListName.trim();
    if (!name) return toast.warn("Please enter a list name.");
    if (lists.some((l) => l.toLowerCase() === name.toLowerCase())) {
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
        toast.success(`List "${name}" added!`);
        setShowAddListForm(false);
        setNewListName("");
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
      closePopover();
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
        <button className={styles.addButton} onClick={openPopover}>
          <StarIcon style={{ color: "white", fontSize: "20px" }} />
        </button>

        <Popover
          open={Boolean(popAnchor)}
          anchorEl={popAnchor}
          onClose={closePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              p: 1.5,
              backgroundColor: "#f4e1d2",
              borderRadius: "10px",
              minWidth: 260,
            },
            onKeyDown: (e) => e.stopPropagation(),
            onKeyDownCapture: (e) => e.stopPropagation(),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
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
