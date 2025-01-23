import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';

export default function StarRatingButton({ defaultValue, precision, onChange, name, movieId, title } ) {

  return (
    <>    
      <Rating 
          name={ name } 
          defaultValue={ defaultValue }
          precision={ precision } 
          onChange={ onChange }
          sx={{
            '& .MuiRating-iconFilled': {
                color: '#ff9800', // Color for filled stars (e.g., amber)
            },
            '& .MuiRating-iconEmpty': {
                color: '#e0e0e0', // Color for empty stars (e.g., light gray)
            },
            '& .MuiRating-iconHover': {
                color: '#ffcc00', // Hover color for stars (e.g., yellow)
            },
        }}
      />    
    </>   
  );
}

StarRatingButton.propTypes = {
  name: PropTypes.string,  
  defaultValue: PropTypes.number,
  precision: PropTypes.number,
  onChange: PropTypes.func, 
  movieId: PropTypes.number,
  title: PropTypes.string
};

