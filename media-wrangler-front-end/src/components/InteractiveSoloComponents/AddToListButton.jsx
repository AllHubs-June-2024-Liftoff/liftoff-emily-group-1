import React, { useState, useMemo } from "react";
import { Menu, MenuItem, TextField, Button, Box } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { useAuth } from "../../Services/AuthContext";
import { useLists } from "../../Services/ListContext"; // ✅ correct hook

function AddToListMenu({ movieId }) {
  const { user } = useAuth();
  const { lists, setLists, refreshLists } = useLists(); // ✅ use context
  const [anchorEl, setAnchorEl] = useState(null);
  const [newListName, setNewListName] = useState("");
  const [showAddListForm, setShowAddListForm] = useState(false);

  // Derive names for validation/display; lists are objects [{id, listName, ...}]
  const listNames = useMemo(
    () => lists.map((l) => l?.listName).filter(Boolean),
    [lists]
  );

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
    // Optional: ensure freshest lists each time menu opens
    if (user?.id) refreshLists?.();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowAddListForm(false);
  };

  const handleAddList = async () => {
    if (!user?.id) return alert("You must be logged in.");
    if (!newListName.trim()) return alert("List name cannot be empty.");
    if (listNames.includes(newListName.trim())) return alert("List already exists.");

    try {
      const payload = { userId: user.id, listName: newListName.trim() };
      const response = await fetch("http://localhost:8080/api/lists/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        alert("Failed to add list.");
        return;
      }

      // Prefer using the created list from backend (with id)
      let created = null;
      try {
        created = await response.json();
      } catch {
        // backend might not return JSON; fall back to optimistic add
      }

      if (created && (created.id || created.listName)) {
        setLists((prev) => [...prev, created]);
      } else {
        // optimistic fallback
        setLists((prev) => [...prev, { id: Date.now(), listName: newListName.trim() }]);
      }

      refreshLists?.(); // ensure global state aligns with server
      setNewListName("");
      setShowAddListForm(false);
      alert(`List "${newListName}" added successfully!`);
    } catch (error) {
      console.error("Error adding list:", error);
      alert("Failed to add list.");
    }
  };

  const handleSelectList = async (listName) => {
    if (!user?.id) return alert("You must be logged in.");
    const idNum = Number(movieId);
    if (!Number.isFinite(idNum) || idNum <= 0) {
      alert("Invalid movie id.");
      return;
    }

    try {
      const payload = { listName, movieId: idNum, userId: user.id };
      const response = await fetch("http://localhost:8080/api/lists/add-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.ok) {
        alert(`Movie added to "${listName}"`);
        refreshLists?.();
      } else {
        alert("Failed to add movie to the list.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add movie to the list.");
    } finally {
      handleMenuClose();
    }
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
          style: {
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#f4e1d2",
            boxShadow: "none",
          },
        }}
      >
        {lists.map((l) => (
          <MenuItem
            key={l.id ?? `ln-${l.listName}`} // ✅ stable key
            onClick={() => handleSelectList(l.listName)}
            sx={{
              fontWeight: "bold",
              borderRadius: "4px",
              color: "#9e5231",
              "&:hover": { backgroundColor: "#f6d8c3" },
            }}
          >
            <GradeIcon sx={{ color: "#9e5231", mr: 1 }} />
            {l.listName}
          </MenuItem>
        ))}

        {!showAddListForm && (
          <MenuItem
            onClick={() => setShowAddListForm(true)}
            sx={{
              fontWeight: "bold",
              color: "#9e5231",
              "&:hover": { backgroundColor: "#f6d8c3" },
            }}
          >
            + Add List
          </MenuItem>
        )}

        {showAddListForm && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", p: 1 }}>
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
