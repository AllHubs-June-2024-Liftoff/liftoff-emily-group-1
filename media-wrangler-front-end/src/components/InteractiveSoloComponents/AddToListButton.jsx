import React, { useState, useEffect } from "react";
import { Menu, MenuItem, TextField, Button, Box } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import StarIcon from "@mui/icons-material/Star";
import { useAuth } from "../../Services/AuthContext";
import { useListContext } from "../../Services/ListContext";

function AddToListMenu({ movieId }) {
  const { user } = useAuth();
  const { lists, setLists } = useListContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newListName, setNewListName] = useState("");
  const [showAddListForm, setShowAddListForm] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`http://localhost:8080/api/lists/user-lists?userId=${user.id}`);
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
  }, [user?.id, setLists]);

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowAddListForm(false);
  };

  const handleAddList = async () => {
    if (!newListName.trim()) return alert("List name cannot be empty.");
    if (lists.includes(newListName)) return alert("List already exists.");

    try {
      const payload = { userId: user.id, listName: newListName };
      const response = await fetch("http://localhost:8080/api/lists/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setLists((prevLists) => [...prevLists, newListName]);
        setNewListName("");
        setShowAddListForm(false);
        alert(`List "${newListName}" added successfully!`);
      } else {
        alert("Failed to add list.");
      }
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  const handleSelectList = (listName) => {
    const payload = { listName, movieId, userId: user.id };

    fetch("http://localhost:8080/api/lists/add-movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Movie added to "${listName}"`);
        } else {
          alert("Failed to add movie to the list.");
        }
      })
      .catch((error) => console.error("Error:", error));

    handleMenuClose();
  };

  return (
    <>
      <button
  onClick={handleAddClick}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#fff")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
>
  ADD TO LIST +
</button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: { padding: "16px", borderRadius: "8px", backgroundColor: "#f4e1d2", boxShadow: "none" },
        }}
      >
        {lists.map((listName, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelectList(listName)}
            sx={{
              fontWeight: "bold",
              borderRadius: "4px",
              color: "#9e5231",
              "&:hover": { backgroundColor: "#f6d8c3" },
            }}
          >
            <GradeIcon sx={{ color: "#9e5231" }} /> {listName}
          </MenuItem>
        ))}
        {!showAddListForm && (
          <MenuItem
            onClick={() => setShowAddListForm(true)}
            sx={{ fontWeight: "bold", color: "#9e5231", "&:hover": { backgroundColor: "#f6d8c3" } }}
          >
            + Add List
          </MenuItem>
        )}
        {showAddListForm && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", padding: "8px" }}>
            <TextField
              label="New List Name"
              variant="outlined"
              size="small"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              sx={{ width: "200px" }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddList}
              sx={{
                backgroundColor: "#9e5231",
                color: "white",
                "&:hover": { backgroundColor: "#b8643f" },
                borderRadius: "8px",
                textTransform: "capitalize",
              }}
            >
              Add List
            </Button>
          </Box>
        )}
      </Menu>
    </>
  );
}

export default AddToListMenu;
