import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import StarRatingButton from '../InteractiveSoloComponents/StarRatingButton';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "./JournalReviewCard.css";
import { Paper } from "@mui/material";






export default function TestJournalReviewCard({ title, poster, watchAgain, tags, rating, isSpoiler, review, dateWatched, award, yearReleased }) {
    return (
        <>
         
        <Paper
            elevation={0}
            sx={{
                maxWidth: 1200,
                background: "#004d40",
                margin: "30px",
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
                       
                            <Typography>
                                <h3>Username here...</h3>
                            <div>
                                <img style={{height: "300px", width: "auto", margin: "10px"}} src={ poster } alt="movie poster" />
                            </div>
                            <StarRatingButton
                                name="rating"
                                defaultValue={ rating }                            
                                readOnly
                                title={ title }
                            />                      
                            </Typography>
                            <Typography className="spoiler-alert" >                                                  
                                {(isSpoiler && <p className="spoiler-alert"><PriorityHighIcon />Contains Spoilers </p>)}
                            </Typography>
                        </div>                                    
                        <CardContent className="user-review">    
                            <Typography variant="h4" component="div">
                                { title }
                                <span style={{ fontSize: '1.5rem', margin: '0', color: "#ff8f00", fontWeight: '100' }}> ({ yearReleased }) </span>
                                <Typography variant='body2' sx={{ color: 'text.secondary'}}>
                                    Watched on { dateWatched }  
                                </Typography>
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
                                        <Typography variant="body2" sx={{ color: 'text.secondary'}}>{tag}</Typography>
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
