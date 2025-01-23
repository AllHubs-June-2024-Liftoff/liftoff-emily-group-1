import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, CardActions, Avatar, Paper, Divider, TextField } from '@mui/material';
import "../ReviewDisplay/JournalReviewCard.css";
import submitUserComment from "../../Services/CommentService";
import { useAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';




const MovieReviewListCard = () => {

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState('');


  const { user } = useAuth();
  const navigate = useNavigate();



  function handleCommentClick() {
    setShowCommentBox(prev => !prev);
  };

  function handleCommentChange(event) {
    setUserComment(event.target.value);
  };

  function handleCancelComment() {
    setUserComment('');
    setShowCommentBox(false);
  }



  async function handleSaveComment(e) {
    e.preventDefault();

    if(!user) {
      alert("You must be logged in to write a review");
      navigate('/login');
  }
   
    if(!userComment) {   
      alert("You must write a comment or press cancel");
      return;
    }
     

    //TODO: Add in review once the cards are dynamic
    const userCommentData = { 
      userComment,
      user
    }


    
    console.log("Submitting user comment for:", userCommentData);
  

    try {
      const responseMessage = await submitUserComment(userCommentData); 

      if (responseMessage === "Success") {
        console.log("Comment saved successfully!")
      

      } else {
        setError(responseMessage);
      }
      
    } catch (error) {
        console.error("Unexpected error during movie review submission: ", error);
        setError({error: "An unexpected error occurred. Please try again"});

    } finally {
      setUserComment('');
      setShowCommentBox(false); 
    }
  };



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
            Here is the users textarea input for the review that they submitted  {/* replace to be dynamic */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" >Like</Button>
          <Button size="small" onClick={handleCommentClick} >Comment</Button>
        </CardActions>
        {showCommentBox && (
          <CardContent>
            <TextField
              label="Write a comment"
              fullWidth
              multiline
              value={userComment}
              onChange={handleCommentChange}
              sx={{ marginBottom: 2 }}
            />            
            <Button size="small" onClick={handleSaveComment}>Save</Button>
            <Button size="small" onClick={handleCancelComment} >Cancel </Button>
          </CardContent>
        )}
      </Card>
      </Paper>
    </div>
  )
}


export default MovieReviewListCard;


