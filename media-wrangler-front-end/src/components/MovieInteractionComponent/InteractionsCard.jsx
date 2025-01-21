import React, { useState } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import PropTypes from 'prop-types';
import StarRatingButton from '../InteractiveSoloComponents/StarRatingButton';
import LoveButton from '../InteractiveSoloComponents/LoveButton';
import WriteReviewButton from '../InteractiveSoloComponents/WriteReviewButton';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../../Services/AuthContext';
import AddToListMenu from "../InteractiveSoloComponents/AddToListButton";

/*
    TODO: The "Add to Lists" and "Your Journal" buttons need to be handled once these features are setup and ready for it.

    TODO: The "liked" button counter needs some focus, figure out how to save the counts so we can display the total "likes" across all reviews
*/

function InteractionsCard({ movieDetails }) {

    const [rating, setRating] = useState(0);
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    
    
    const { user } = useAuth();
    const navigate = useNavigate();

    function onChangeRating(e) {
        setRating(e.target.value);
    }

    

    function handleLikeClick() {
        setLiked(!isLiked); 
        if (isLiked) {
            setLikeCount(likeCount - 1); 
        } else {
            setLikeCount(likeCount + 1); 
        }
    }
 

    //state comes fom the navigate of react-router-dom. Everything from the movie object we want to pass to the movieReview is put in the state
    function handleWriteReviewClick() {
        if(!user) {
            alert("You must be logged in to write a review");
            navigate('/login');
        }
        navigate("/reviews/create", {
            state: { movieDetails, user }
        });
    }

    function handleJournalClick() {
        if(!user) {
            alert("You must be logged in to visit your journal");
            navigate('/login');
        }
        navigate(`/reviews/user/${user.id}`, {
            state: { user }

        });
    }
      
    
    const buttons = [
        <Button key="one" className="button-container">
            <div className="button-content">
                <span className="button-label">Rate</span>
                <StarRatingButton
                    name="half-rating" 
                    title={ movieDetails.title }
                    defaultValue={0} 
                    precision={0.5} 
                    onChange={ onChangeRating }
                />
            </div>
        </Button>,
        <Button 
            key="two" 
            className="button-container"
            name="like-button"
            title={ movieDetails.title }
            value={ isLiked }                    
            onClick={ handleLikeClick }
        > 
            <div className="button-content">
               <FavoriteIcon sx={{ fontSize: '40px', color: isLiked ? 'red' : 'gray', 
          transition: 'color 0.3s',  }} /> 
               <br />
               <span className="button-label">Likes { likeCount }</span>                
            </div>
        </Button>,
        <Button 
            key="three" 
            className="button-container"
            name="write-review"
            title={ movieDetails.title }
            onClick={ handleWriteReviewClick } 
        >
            <div className="button-content">
                <span className="button-label">Write Review</span>   
            </div>
            </Button>,
             <Button>
             <AddToListMenu movieId={movieDetails.id} />
           </Button>,
            <Button 
                key="five" 
                className="button-container"
                name="route-to-journal"
                onClick={ handleJournalClick }
            >
                <div className="button-content">
                    <span className="button-label">Your Journal</span>
                </div>
            </Button>
    ];
    
    return (
      <div >
        <Box 
        sx={{
            display: 'flex',
            '& > *': {
            m: 1,
            },
        }}
        >      
            <ButtonGroup
                orientation="vertical"
                aria-label="Vertical button group"
                sx={{
                    backgroundColor:"rgb(41, 43, 45)",  
                    borderRadius: '8px',   
                    border: "2px solid #ff8f00"        
                }}
            >
                {buttons}
                
            </ButtonGroup>
        </Box>
    </div>
  );
}

export default InteractionsCard;

InteractionsCard.propTypes = {
    movieId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.array.isRequired,
    poster: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired
}

