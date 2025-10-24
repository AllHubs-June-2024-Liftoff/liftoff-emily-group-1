import React, { useState } from "react";
import {Card,CardContent ,CardMedia, Typography, CardActionArea, CardActions, Button, Paper, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import "../../stylings/MovieDetailsPage.css";
import InteractionsCard from "../MovieInteractionComponent/InteractionsCard";

function MovieDetailCard({ movieDetails }) {
  const [isOpen, setOpen] = useState(false);

  // Normalize TMDB fields (accept camelCase or snake_case)
  const posterPath = movieDetails?.posterPath ?? movieDetails?.poster_path ?? "";
  const releaseDate =
    movieDetails?.releaseDate ?? movieDetails?.release_date ?? "";

  const baseImageURL = "https://image.tmdb.org/t/p/w300";
  const fullPosterURL = posterPath
    ? `${baseImageURL}${posterPath}`
    : "/placeholder-poster.png";

  const yearReleased = releaseDate ? new Date(releaseDate).getFullYear() : "—";

  const handlePosterClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1100,
          background: "rgba(249, 79, 0 , 0.55)",
          margin: "40px auto",
          padding: "10px",
          borderRadius: "14px",
        }}
      >
        <div className="movie-detail-container">
          <Card
            sx={{
              maxWidth: 1000,
              background: "rgba(19, 19, 20, 0.81)",
              borderRadius: "14px",
              border: "3px solid rgba(5, 70, 105, 0.93)",
            }}
            variant="outlined"
          >
            <div className="movie-info-container">
              <div>
                <CardActionArea onClick={handlePosterClick}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={fullPosterURL}
                    alt={`${movieDetails?.title ?? "Movie"} poster`}
                    sx={{ objectFit: "cover" }}
                  />
                </CardActionArea>

                <Modal
                  open={isOpen}
                  onClose={handleClose}
                  aria-labelledby="poster-modal-title"
                >
                  <Box
                    sx={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 2,
                      outline: "none",
                      borderRadius: 2,
                    }}
                  >
                    <IconButton
                      aria-label="Close poster"
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "grey.500",
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <img
                      src={fullPosterURL}
                      alt={`${movieDetails?.title ?? "Movie"} poster large`}
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        display: "block",
                        margin: "0 auto",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                </Modal>
              </div>

              <CardContent sx={{ color: "white" }}>
                <Typography gutterBottom variant="h4" component="h1">
                  {movieDetails?.title ?? "Untitled"}
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "2rem",
                      color: "#ff8f00",
                    }}
                  >
                    ({yearReleased})
                  </span>
                </Typography>

                <Typography variant="body2">
                  <b>Date Released:</b>{" "}
                  {releaseDate || "Unknown release date"}
                </Typography>

                <br />
                <br />

                <Typography variant="body1">
                  <b>Overview:</b>{" "}
                  {movieDetails?.overview || "No overview available."}
                </Typography>
              </CardContent>
            </div>

            <CardActions>
              <Button size="small">Want to Watch</Button>
              <Button size="small">Watched</Button>
            </CardActions>
          </Card>

          <InteractionsCard movieDetails={movieDetails} />
        </div>
      </Paper>
    </div>
  );
}

MovieDetailCard.propTypes = {
  movieDetails: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    overview: PropTypes.string,
    posterPath: PropTypes.string,   // camelCase variant
    poster_path: PropTypes.string,  // snake_case variant
    releaseDate: PropTypes.string,  // camelCase variant (YYYY-MM-DD)
    release_date: PropTypes.string, // snake_case variant
  }),
};

export default MovieDetailCard;
 