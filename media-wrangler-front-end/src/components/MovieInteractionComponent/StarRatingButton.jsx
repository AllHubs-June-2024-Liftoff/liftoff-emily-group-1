import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function StarRatingButton({ title, id } ) {

    const [rating, setRating] = useState(0);   
 
  function handleOnChange(e){
    setRating(e.target.value);
    // return console.log("User rated the movie with: " + rating);
  }

  return (
    <>    
     <Stack spacing={1} direction="row" >
        <Rating 
            name="half-rating" 
            defaultValue={0} 
            precision={0.5} 
            onChange={handleOnChange}
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
    </Stack>    
    </>   
  );
}

StarRatingButton.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string
}
