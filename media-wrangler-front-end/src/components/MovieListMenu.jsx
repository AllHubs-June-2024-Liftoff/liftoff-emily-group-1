import React from "react";
import {
  Menu,
  MenuItem,
  TextField,
  Button,
  Box
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";

const MovieListMenu = ({
  anchorEl,
  onClose,
  lists,
  selectedMovie,
  showAddListForm,
  setShowAddListForm,
  newListName,
  setNewListName,
  onAddList,
  onSelectList,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{ style: { padding: "16px", backgroundColor: "#f4e1d2", boxShadow: "none" } }}
    >

      {lists.map((listName, i) => (
        <MenuItem key={i} onClick={() => onSelectList(listName)} sx={menuItemStyle}>
          <GradeIcon sx={{ color: "#9e5231" }} /> {listName}
        </MenuItem>
      ))}

      {!showAddListForm && (
        <MenuItem onClick={() => setShowAddListForm(true)} sx={menuItemStyle}>
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
          <Button variant="contained" size="small" onClick={onAddList} sx={{ backgroundColor: "#9e5231" }}>
            Add List
          </Button>
        </Box>
      )}
    </Menu>
  );
};

const menuItemStyle = {
  fontWeight: "bold",
  borderRadius: "4px",
  color: "#9e5231",
  "&:hover": { backgroundColor: "#f6d8c3" },
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

export default MovieListMenu;
