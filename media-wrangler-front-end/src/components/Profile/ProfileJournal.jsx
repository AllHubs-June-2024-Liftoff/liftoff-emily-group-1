import React, { useEffect, useState } from 'react';
import { fetchMovieReviewsByUser } from '../../Services/MovieReviewService';
import { useNavigate, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';

/* ===== Western Desert Palette ===== */
const COLORS = {
  sand: '#F5E8CE',
  sandSoft: '#F0DFC3',
  sandAlt: '#EAD6B6',
  camel: '#A97848',
  clay: '#C26A3D',
  cream: '#FFF9F0',
  charcoal: '#3D2B1F',
  turquoise: '#3CA6A6',
  turquoiseDark: '#2E8E8E',
  mustard: '#DDAA00',
};

function UserJournalPage() {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);   // safer default than null
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMovieReviewsByUser(userId);
      setReviews(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchData();
  }, [userId]);

  if (loading) return <p style={{ color: COLORS.cream, textAlign: 'center' }}>Loading reviews...</p>;

  /* ===== Styled MUI components ===== */
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: COLORS.clay,
      color: COLORS.cream,
      textAlign: 'center',
      fontFamily: "'Roboto Slab', serif",
      fontWeight: 800,
      fontSize: 16,
      borderBottom: `2px solid ${COLORS.camel}`,
      letterSpacing: '0.2px',
      paddingTop: 12,
      paddingBottom: 12,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: COLORS.charcoal,
      textAlign: 'center',
      fontFamily: "'Roboto Slab', serif",
      borderBottom: `1px solid ${COLORS.sandAlt}`,
      paddingTop: 12,
      paddingBottom: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: COLORS.sand,
    },
    '&:nth-of-type(even)': {
      backgroundColor: COLORS.sandSoft,
    },
    '&:hover': {
      filter: 'brightness(0.98)',
    },
    transition: 'filter 120ms ease-in-out',
  }));

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1100,
          background: COLORS.sand,                  // card background
          margin: "30px auto",
          padding: "20px",
          border: `2px solid ${COLORS.camel}`,      // camel border
          borderRadius: "14px",
          fontFamily: "'Roboto Slab', serif",
          color: COLORS.charcoal,
          boxShadow: '0 8px 22px rgba(0,0,0,0.15)',
        }}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            background: 'transparent',
            borderRadius: '12px',
            overflow: 'hidden',                     // clean rounded corners
            border: `1px solid ${COLORS.sandAlt}`,
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="journal table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date Watched</StyledTableCell>
                <StyledTableCell align="center">Movie Poster</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Year Released</StyledTableCell>
                <StyledTableCell align="center">Rating</StyledTableCell>
                <StyledTableCell align="center">Rewatchable</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{
                    background: COLORS.sandSoft,
                    color: COLORS.charcoal,
                    fontWeight: 700,
                    padding: '18px',
                    borderBottom: `1px solid ${COLORS.sandAlt}`,
                  }}>
                    No journal started yet — write a review to create your first entry.
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review) => (
                  <StyledTableRow key={review.id}>
                    <StyledTableCell component="th" scope="row" sx={{ color: COLORS.charcoal }}>
                      <EventNoteTwoToneIcon
                        fontSize="medium"
                        sx={{ color: COLORS.mustard, verticalAlign: 'middle', mr: 0.5 }}
                      />
                      <br />
                      {review.dateWatched}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <img
                        src={review.fullPosterURL}
                        alt={review.title}
                        style={{
                          width: 100,
                          height: 85,
                          objectFit: 'cover',
                          borderRadius: 8,
                          border: `1px solid ${COLORS.camel}`,
                          boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
                        }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <span
                        onClick={() => navigate(`/reviews/view/${review.id}`)}
                        style={{
                          color: COLORS.turquoise,
                          fontWeight: 800,
                          fontSize: 20,
                          cursor: "pointer",
                          textDecoration: "underline",
                          textDecorationThickness: "1px",
                          textDecorationColor: COLORS.camel,
                          textUnderlineOffset: "3px",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.turquoiseDark)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.turquoise)}
                      >
                        {review.title}
                      </span>
                    </StyledTableCell>

                    <StyledTableCell align="center" sx={{ color: COLORS.charcoal }}>
                      {review.yearReleased}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Rating
                        name="read-only"
                        value={review.ratingValue}
                        readOnly
                        sx={{
                          '& .MuiRating-iconFilled': { color: COLORS.mustard },
                          '& .MuiRating-iconEmpty': { color: `${COLORS.camel}55` },
                        }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center" sx={{ fontWeight: 700 }}>
                      {review.watchAgain}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <span
          onClick={() => navigate(`/reviews/user/${userId}`)}
          style={{
            display: 'inline-block',
            marginTop: 16,
            color: COLORS.turquoise,
            fontWeight: 800,
            fontSize: "18px",
            cursor: "pointer",
            textDecoration: "underline",
            textDecorationThickness: "1px",
            textDecorationColor: COLORS.camel,
            textUnderlineOffset: "3px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.turquoiseDark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.turquoise)}
        >
          View Your Journal
        </span>
      </Paper>
    </div>
  );
}

export default UserJournalPage;


//TODO: I need to reformat the date for dateWatched --- and dateReleased as well. 