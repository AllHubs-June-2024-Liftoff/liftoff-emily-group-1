import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GradeIcon from "@mui/icons-material/Grade";

const menuItemStyles = {
  fontWeight: "bold",
  borderRadius: "4px",
  color: "#9e5231",
  "&:hover": { backgroundColor: "#f6d8c3" },
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

export default function MovieListMenu({
  anchorEl,
  onClose,
  lists = [],
  selectedMovie, // not used here, but kept for API parity with caller
  showAddListForm,
  setShowAddListForm,
  newListName,
  setNewListName,
  onAddList,
  onSelectList,
}) {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const inputRef = React.useRef(null);

  // Sync local dialog state with parent flag (so HomePage doesn't need changes)
  React.useEffect(() => {
    if (showAddListForm) {
      // close the Menu first so it can't intercept keys
      onClose?.();
      // open the dialog on next tick (ensures Menu unmounts)
      const id = setTimeout(() => setAddDialogOpen(true), 0);
      return () => clearTimeout(id);
    } else {
      setAddDialogOpen(false);
    }
  }, [showAddListForm, onClose]);

  // Autofocus the input when the dialog opens
  React.useEffect(() => {
    if (addDialogOpen) {
      const id = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(id);
    }
  }, [addDialogOpen]);

  const openAddFromMenu = () => {
    // parent will trigger the effect above to open the dialog
    setShowAddListForm?.(true);
  };

  const closeAddDialog = () => {
    setShowAddListForm?.(false);
    setNewListName?.("");
    setAddDialogOpen(false);
  };

  const handleAddClick = async () => {
    // delegate to parent handler (it already toasts and resets state)
    await onAddList?.();
    // parent will set showAddListForm(false) on success; we also close defensively
    closeAddDialog();
  };

  return (
    <>
      {/* Plain Menu: selection only (no inputs here) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        disableAutoFocusItem
        MenuListProps={{ autoFocusItem: false }}
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
            onClick={() => onSelectList?.(listName)}
            sx={menuItemStyles}
          >
            <GradeIcon sx={{ color: "#9e5231" }} /> {listName}
          </MenuItem>
        ))}

        <MenuItem onClick={openAddFromMenu} sx={menuItemStyles}>
          + Add List
        </MenuItem>
      </Menu>

      {/* Dialog for adding a new list (opens after Menu closes) */}
      <Dialog
        open={addDialogOpen}
        onClose={closeAddDialog}
        // prevents focus from snapping back to the (now-closed) Menu anchor
        disableRestoreFocus
      >
        <DialogTitle>Add a New List</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="New List Name"
            variant="outlined"
            fullWidth
            size="small"
            value={newListName}
            onChange={(e) => setNewListName?.(e.target.value)}
            inputRef={inputRef}
            autoFocus
            // extra safety against stray global handlers
            onKeyDown={(e) => e.stopPropagation()}
            onKeyDownCapture={(e) => e.stopPropagation()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Cancel</Button>
          <Button
            onClick={handleAddClick}
            variant="contained"
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
        </DialogActions>
      </Dialog>
    </>
  );
}
