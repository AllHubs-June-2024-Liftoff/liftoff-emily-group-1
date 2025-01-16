import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import StarRatingButton from '../InteractiveSoloComponents/StarRatingButton';
import LoveButton from '../InteractiveSoloComponents/LoveButton';
import WriteReviewButton from '../InteractiveSoloComponents/WriteReviewButton';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';



function InteractionsCard({ title, movieId, poster, releaseDate, genre }) {

    const [rating, setRating] = useState(0);
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    
    const navigate = useNavigate();

    function onChangeRating(e) {
        setRating(e.target.value);
    }
    //TODO: Remove: only for testing purposes
    console.log("The user has given ", rating, "stars to ", { title }, "(",{ movieId },")");
    

    function handleLikeClick() {
        setLiked(!isLiked); 
        if (isLiked) {
            setLikeCount(likeCount - 1); 
        } else {
            setLikeCount(likeCount + 1); 
        }
    }
    //TODO: Remove: only for testing purposes
    console.log("user clicked the heart for ", { title }, "(",{ movieId },")", isLiked, likeCount);

    //state comes fom the navigate of react-router-dom. Everything from the movie object we want to pass to the movieReview is put in the state
    function handleWriteReviewClick() {
        navigate("/reviews/create", {
            state: { title, movieId, poster, releaseDate, genre }  
        });
    }
      
    
    const buttons = [
        <Button key="one" className="button-container">
            <div className="button-content">
                <span className="button-label">Rate:</span>
                <StarRatingButton
                    name="half-rating" 
                    title={ title }
                    movieId={ movieId }
                    defaultValue={0} 
                    precision={0.5} 
                    onChange={ onChangeRating }
                />
            </div>
        </Button>,
        <Button key="two" className="button-container">
            <div className="button-content">
                <span className="button-label">Like:</span>
                <LoveButton 
                    name="like-button"
                    title={ title } 
                    movieId={ movieId } 
                    value={ isLiked }                    
                    onClick={ handleLikeClick }                   
                />
            </div>
        </Button>,
        <Button key="three" className="button-container">
            <div className="button-content">
                <span className="button-label">Write Review:</span>
                <WriteReviewButton 
                    name="write-review"
                    title={ title } 
                    movieId={ movieId }
                    onClick={ handleWriteReviewClick }  
                />
            </div>
            </Button>,
                    <Button key="four" className="button-container">
                    <div className="button-content">
                        <span className="button-label"> Add to Lists </span>
                        <AddIcon />
                    </div>
                    </Button>,
                            <Button key="five" className="button-container">
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

