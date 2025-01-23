import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, Divider, Stack, Paper, Box } from '@mui/material';
import StarRatingButton from '../InteractiveSoloComponents/StarRatingButton';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "./JournalReviewCard.css";
import PropType from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';







export default function JournalReviewCard({ title, fullPosterURL, watchAgain, tags, rating, isSpoiler, review, dateWatched, award, yearReleased }) {
    return (
        <>
         
        <Paper
            elevation={0}
            sx={{
                maxWidth: 1200,
                background: "#004d40",
                margin: "30px auto",
                padding: "20px",
                transform: "scale(.9)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                }
            }} >
             <div className="user-review-container">
                <Card sx={{ border: "4px solid #ff8f00" }} variant="outlined">
                    <div className="movie-info-container">
                        <div>
                            {/* <Chip avatar={<Avatar>CHO</Avatar>} label={ username } /> */}
                       
                            <Typography variant='h6'>
                                Username here...
                            <div>
                                <img style={{height: "300px", width: "auto", margin: "10px"}} src={ fullPosterURL } alt="movie poster" />
                            </div>
                            <StarRatingButton
                                name="rating"
                                defaultValue={ rating }                            
                                readOnly
                                title={ title }
                            />                      
                            </Typography>
                            <Typography className="spoiler-alert" >                                                  
                                {(isSpoiler && <Typography className="spoiler-alert"><PriorityHighIcon />Contains Spoilers </Typography>)}
                            </Typography>
                        </div>                                    
                        <CardContent className="user-review">    
                            <Typography variant="h4" component="div">
                                { title }
                                <span style={{ fontSize: '1.5rem', margin: '0', color: "#ff8f00", fontWeight: '100' }}> ({ yearReleased }) </span>
                                <hr style={{ background: isSpoiler ? "#d50000" : "teal" }} />
                            </Typography>                                                                          
                            <Typography variant="body1" sx={{ color: 'text.primary', textAlign: 'center', fontSize: '22px' }}>
                                <b> { award } </b>
                           
                            </Typography>                            
                            <br />                                      
                            <Typography variant="body1" sx={{ color: 'black' }}  >
                                { review }
                            </Typography>
                            <br />
                            <Typography variant='body2' sx={{ color: 'text.secondary'}}>
                                    Watched on { dateWatched }  
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant='body2' sx={{ color: 'text.secondary'}}>
                                    Would You Watch Again?                                                          
                                </Typography>
                                {(watchAgain === "yes" ? <CheckCircleIcon sx={{fontSize: "25px", color: "blue", marginLeft: "5px"}} /> :                        <CancelIcon sx={{fontSize: "25px", color: "red", marginLeft: "5px"}} />  )}                           
                            </Box>
                            <br />
                            <Typography>
                                <b>Your Tags:</b>
                            </Typography>    
                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem sx={{borderWidth: 1, borderColor: isSpoiler ? '#d50000' : "#00695c" }} />}
                                spacing={2}
                            >
                                { tags.map((tag, index) => (
                                    <div key={tag.id}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary'}}>{ tag }
                                        </Typography>
                                    </div>))}
                            </Stack>
                        </CardContent>            
                    </div>                
                    <CardActions>
                        <Button
                            size="small">Edit Review</Button>
                        <Button
                            size="small" color="error" >Delete Review</Button>
                    </CardActions>                          
                </Card>
            </div>  
            </Paper>
           
        </>
    );
}


JournalReviewCard.propTypes = {
    title: PropType.string, 
    poster: PropType.string, 
    watchAgain: PropType.string, 
    tags: PropType.array, 
    rating: PropType.number,    //<---- is it a number? User input is converted to strings, so would it actually be a string
    isSpoiler: PropType.bool, 
    review: PropType.string, 
    dateWatched: PropType.string, 
    award: PropType.string, 
    yearReleased: PropType.string
}