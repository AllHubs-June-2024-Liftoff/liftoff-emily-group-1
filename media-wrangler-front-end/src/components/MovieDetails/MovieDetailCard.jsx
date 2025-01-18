import * as React from 'react';
import { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './MovieDetailCard.css';
import PropTypes from 'prop-types';
import MovieInteractions from '../MovieInteractions/InteractionsCard';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";



function MovieDetailCard({ title, releaseDate, overview, poster, id }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userLists, setUserLists] = useState([]);
    const [newListName, setNewListName] = useState("");
  

  //NOTE: The Movie Database (TMDb), the base URL for images might look like https://image.tmdb.org/t/p/w500. So, you would construct the full URL by concatenation... I didn't want image so large, so I altered the base URL

  //TODO: uncomment out the baseImageURL and fullPosterURL when the API is hooked back up...And switch { poster } back to { fullPosterURL }
//   const baseImageUrl = "https://image.tmdb.org/t/p/w300";
//   const fullPosterUrl = `${baseImageUrl}${poster}`;
    
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

    useEffect(() => {
        axios.get("http://localhost:8080/api/lists/user", { withCredentials: true })
          .then((response) => setUserLists(response.data))
          .catch((error) => console.error("Error fetching user lists:", error));
      }, []);
    
      const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };
    
      const handleAddToList = (listName) => {
        axios.post(
          "http://localhost:8080/api/lists/add",
          { listName, movieId: id },
          { withCredentials: true }
        )
        .then(() => {
          alert(`Added to ${listName}`);
          handleMenuClose();
        })
        .catch((error) => console.error("Error adding movie to list:", error));
      };
    
      const handleCreateNewList = () => {
        if (newListName.trim()) {
          handleAddToList(newListName);
          setNewListName("");
        }
      };


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
                <CardActions>
                    <Button onClick={handleWantToWatch} size="small">
                        Want to Watch
                    </Button>
                    <Button onClick={handleWatched} size="small">
                        Watched
                    </Button>
                    {/* Add button for adding to list */}
                    <Button onClick={handleMenuClick} size="small">
                        + Add
                    </Button>
                    {/* Dropdown menu for list selection */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        {userLists.map((list) => (
                        <MenuItem key={list.id} onClick={() => handleAddToList(list.name)}>
                            {list.name}
                        </MenuItem>
                        ))}
                        <MenuItem>
                        <input
                            type="text"
                            placeholder="New List"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <Button onClick={handleCreateNewList}>Create</Button>
                        </MenuItem>
                    </Menu>
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
