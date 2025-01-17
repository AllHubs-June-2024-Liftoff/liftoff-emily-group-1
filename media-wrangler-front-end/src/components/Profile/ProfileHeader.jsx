import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Typography, Button } from '@mui/material';
// import { deepOrange, deepPurple } from '@mui/material/colors';

export default function LetterAvatars({ user }) {
  if (!user) {
    return <p>Loading...</p>
  }

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <Box 
      component="section" 
      sx={{
        display: 'flex',
        // alignItems: 'center', 
        p: 2, 
        border: '1px solid grey',
        width: '50%',
        margin: '0 auto',
      }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar>{getInitials(user.firstname + " " + user.lastname)}</Avatar>
        <Typography variant="h6">{user.username}</Typography>
        <Button
        variant="contained"
        sx={{ marginLeft: "auto" }}
        onClick={(() => alert("Edit profile clicked"))}
        >
        Edit Profile
      </Button>
      </Stack>
    </Box>
  );
}
