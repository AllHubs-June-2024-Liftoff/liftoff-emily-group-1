import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button, Paper } from '@mui/material';
import './MovieDetailCard.css';
import PropTypes from 'prop-types';
import InteractionsCard from '../MovieInteractionComponent/InteractionsCard';
import MovieDetailsNav from '../nav/MovieDetailsNav';
import AddToListMenu from "../InteractiveSoloComponents/AddToListButton";




    //TODO: The "watched" and "want to watch" buttons need to be finished when the lists are ready for them. These buttons can be used, we can add them to the InteractionsCard -- OR-- they can be incorporated in a different way based on what the feature designer would like to do
    
    //TODO: uncomment out the baseImageURL and fullPosterURL when the API is hooked back up...And switch { poster } back to { fullPosterURL }
  
    
   

   

function MovieDetailCard({ movieDetails }) {

    console.log('Received movieDetails:', movieDetails);

    const baseImageURL = "https://image.tmdb.org/t/p/w300";
    const fullPosterURL = `${baseImageURL}${movieDetails.posterPath}`;
    
    const yearReleased = new Date(movieDetails.releaseDate).getFullYear();

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


  return (
    <>
        <Paper 
            elevation={0} 
            sx={{
                maxWidth: 1100, 
                background: "#004d40", 
                margin: "30px auto", 
                padding: "20px",             
            }} 
        >
            <div className="movie-detail-container">
                <Card sx={{maxWidth: 1000}} variant="outlined">
                    <div className="movie-info-container">
                        <CardActionArea>            
                            <CardMedia
                                onClick={handlePosterClick}
                                component="img"
                                height="300"  
                                width="auto"   
                                image={ fullPosterURL }
                                alt="Movie Poster"
                            />
                        </CardActionArea>
                        <CardContent>            
                            <Typography gutterBottom variant="h3" component="div">
                                { movieDetails.title } 
                                <span style={{ marginLeft: '8px', fontSize: '2rem', color: '#ff8f00' }}>
                                    ({yearReleased})
                                </span>
                            </Typography>          
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <b>Date Released: </b> { movieDetails.releaseDate }
                            </Typography>
                            <br />
                            {/* <Typography variant="body2" sx={{ color: 'black' }}>
                                <b>Genres: </b>{ genre.join(', ') }
                            </Typography> */}
                            <br />
                            <Typography variant="body2" sx={{ color: 'black' }}  >
                                <b>Overview: </b>{ movieDetails.overview }
                            </Typography>          
                        </CardContent>
                        <CardActions>
          <AddToListMenu movieId={movieDetails.id} />
        </CardActions>
                    </div> 
                    <CardActions>
                        <Button onClick={handleWantToWatch}
                            size="small">Want to Watch</Button>
                        <Button onClick={handleWatched}
                            size="small">Watched</Button>
                    </CardActions>          
                </Card>  
                <InteractionsCard movieDetails={ movieDetails } />     
            </div>
        </Paper>
        <MovieDetailsNav movieDetails={ movieDetails } />
    </>
  );
}

export default MovieDetailCard;

MovieDetailCard.propTypes = {
    movieId: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string, 
    overview: PropTypes.string, 
    poster: PropTypes.string,
    genre: PropTypes.array

}


    