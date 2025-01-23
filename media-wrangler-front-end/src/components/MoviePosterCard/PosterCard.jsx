import React, { useState, useEffect } from "react";
import './PosterCard.css'
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
    const fetchLists = async () => {
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
  
    if (userId) {
      fetchLists();
    }
  }, [userId]);

  const handleMouseOver = (id) => {
    setHoveredId(id);
  };

  const handleMouseOut = () => {
    setHoveredId(null);
  };

  const handlePosterClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowAddListForm(false);
  };

  const handleAddList = async () => {
    if (newListName.trim() && !lists.includes(newListName)) {
      const payload = {
        userId,
        listName: newListName,
      };
  
      try {
        const response = await fetch("http://localhost:8080/api/lists/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          setLists((prevLists) => {
            if (!prevLists.includes(newListName)) {
              return [...prevLists, newListName];
            }
            return prevLists;
          });
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
    const payload = {
      listName,
      movieId: movie.id,
      userId,
    };

    fetch("http://localhost:8080/api/lists/add-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Movie added to ${listName}`);
        } else {
          alert("Failed to add movie to the list.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setAnchorEl(null);
  };

  const imageUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w780${movie.posterPath}`
    : fallbackImage;

  return (
    <div id="movie-search">
      <div
        key={movie.id}
        className={styles.posterContainer}
        onMouseOver={() => handleMouseOver(movie.id)}
        onMouseOut={handleMouseOut}
      >
        <img
         onClick={handlePosterClick}
         title={movie.title}
         src={imageUrl}
         alt={movie.title}
         className={styles.posterImage}
          style={{
            border:
              hoveredId === movie.id
                ? "2px solid rgb(99, 180, 176)"
                : "none",
          }}
        />
        <button className={styles.addButton} onClick={handleAddClick}>
          <StarIcon style={{ color: "white", fontSize: "20px" }} />
        </button>
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
