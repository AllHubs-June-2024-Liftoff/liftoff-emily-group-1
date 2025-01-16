import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './MovieDetailCard.css';
import PropTypes from 'prop-types';
import InteractionsCard from '../MovieInteractionComponent/InteractionsCard';
import { Paper } from "@mui/material";


/*
    TODO: The "watched" and "want to watch" buttons need to be finished when the lists are ready for them. These buttons can be used, we can add them to the InteractionsCard -- OR-- they can be incorporated in a different way based on what the feature designer would like to do

    TODO: uncomment out the baseImageURL and fullPosterURL when the API is hooked back up...And switch { poster } back to { fullPosterURL }
    const baseImageUrl = "https://image.tmdb.org/t/p/w300";
    const fullPosterUrl = `${baseImageUrl}${poster}`;

    NOTE: The Movie Database (TMDb), the base URL for images might look like https://image.tmdb.org/t/p/w500. So, you would construct the full URL by concatenation... I didn't want image so large, so I altered the base URL

*/


function MovieDetailCard({ title, releaseDate, overview, poster, movieId, genre }) {

    
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
                                image={ poster }
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
                            <Typography variant="body2" sx={{ color: 'black' }}>
                                <b>Genre:</b>{ genre.join(', ') }
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
                    </CardActions>
                </Card>
                <InteractionsCard
                    title= { title }
                    releaseDate= { releaseDate }
                    overview= { overview }
                    poster= { poster }
                    movieId= { movieId }
                    genre={ genre }
                />
            </div>
        </Paper>
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


