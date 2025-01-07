import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './MovieDetailCard.css';
import PropTypes from 'prop-types';
import MovieInteractions from '../UserInteractions/MovieInteractions';
import StarRating from '../UserInteractions/StarRating';
import LikeButton from '../UserInteractions/LikeButton';



function MovieDetailCard({ title, releaseDate, overview, poster, id }) {

  //NOTE: The Movie Database (TMDb), the base URL for images might look like https://image.tmdb.org/t/p/w500. So, you would construct the full URL by concatenation... I didn't want image so large, so I altered the base URL
  const baseImageUrl = "https://image.tmdb.org/t/p/w300";
  const fullPosterUrl = `${baseImageUrl}${poster}`;
    
    const yearReleased = new Date(releaseDate).getFullYear();

    //NOTE: console.logs are temporary, just checking for basic functionality before moving forward
    function handleWantToWatch() {
        console.log("clicked want to watch button!");
    }

    function handleWatched() {
        console.log("clicked watched button!");
    }

    function handlePosterClick() {
        console.log("clicked movie poster");
    }

    function handleWriteReview() {
        console.log("user wants to write a review")
    }

  return (
    <div className="movie-detail-container">
        <Card sx={{maxWidth: 1000}} variant="outlined">
            <div className="movie-info-container">
                <CardActionArea>            
                <CardMedia
                    onClick={handlePosterClick}
                    component="img"
                    height="300"  
                    width="auto"   
                    image={fullPosterUrl}
                    alt="Movie Poster"
                />
                </CardActionArea>
                <CardContent>            
                    <Typography gutterBottom variant="h2" component="div">
                        { title } 
                        <span style={{ marginLeft: '8px', fontSize: '1.5rem', color: 'teal' }}>
                            ({yearReleased})
                        </span>
                    </Typography>          
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <b>Date Released: </b> { releaseDate }
                    </Typography>
                    <br />
                    <Typography variant="body2" sx={{ color: 'black' }}  >
                        <b>Overview: </b>{ overview }
                    </Typography>          
                </CardContent>
                </div> 
                <CardActions>
                    <Button onClick={handleWantToWatch}
                        size="small">Want to Watch</Button>
                    <Button onClick={handleWatched}
                        size="small">Watched</Button>
                    {/* <Button onClick={handleWriteReview} 
                        size="small">Write a Review</Button>              */}
                </CardActions>

                {/* Leaving here to keep an eye on functionality for now-- especially if adding more props */}
                {/* <StarRating title={ title } id={ id } />
                <LikeButton title={ title } id={ id } />          */}
                
        </Card>
        <div className="movie-interactions-container">
           <MovieInteractions title={ title } id={ id } />  
        </div>
       
    </div>
  );
}

export default MovieDetailCard;

MovieDetailCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string, 
    overview: PropTypes.string, 
    poster: PropTypes.string

}

    //TODO: Figure out how to open the image in a pop up when movie poster is clicked with onClick

    //TODO: Add onClick to watched and want to watch button and get lists going...

    //TODO: I extracted the year released to use, but I don't like the styling (yyyy-mm-dd) figure out how to alter the string returned

    //NOTE: Styling Notes...
    //The variant="outlined" : can be removed and the default should be a shadow for "elevated"
    //card maxWidth can change based on space needed for other components

    //"movie-info-container" : it is making it flex and moved the details to the right of image
    //The movie info is currently centered with the image, but that can be changed adjusting the css

    //the variant="body2" just seems to make the text smaller, I kept it on Release Date but removed from overview
    //However, we might want to change the font styling in general 
