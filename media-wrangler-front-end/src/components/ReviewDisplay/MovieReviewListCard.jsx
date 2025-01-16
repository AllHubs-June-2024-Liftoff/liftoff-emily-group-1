import React from 'react'
import { Card, CardContent, Typography, Button, CardActions, Avatar, Paper, Divider } from '@mui/material';
import "../ReviewDisplay/JournalReviewCard.css";




const MovieReviewListCard = () => {
  return (
    <div className='searched-movie-review-list'>  
      <Paper
        elevation={0}
        sx={{
            maxWidth: 1100,
            background: "#004d40",
            padding: "10px",
            margin: "10px auto",        
        }} >
      <Card sx={{ maxWidth: 1200, marginBottom: 2, border: "3px solid #ff8f00" }}>
        <CardContent>
          <Typography variant="h6" component="div" className="username" color="text.secondary">
            <Avatar>Test</Avatar>     {/* replace with the users avatar */}
            <Typography>reviewed by USERNAME</Typography> {/* replace USERNAME with { username } */}
            <Typography>⭐⭐⭐⭐</Typography> {/* replace with the starRatingButton on readOnly, passing the state from the movie */}
            <span style={{ color: "black" }} ><Typography> 🤠 WRANGLER WINNER</Typography></span>
          </Typography>
          <Divider sx={{marginTop: "10px", marginBottom: "15px"}}/>                
          <Typography variant="body2" color="text.primary" >
            <p>Here is the users textarea input for the review that they submitted</p>   {/* replace to be dynamic */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" >Like</Button>
          <Button size="small" >Comment</Button>
        </CardActions>
      </Card>
      </Paper>
    </div>
  )
}


export default MovieReviewListCard;


