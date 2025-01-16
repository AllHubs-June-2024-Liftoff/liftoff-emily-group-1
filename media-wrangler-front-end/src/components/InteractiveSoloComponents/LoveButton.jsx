


import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function LoveButton({ title, movieId, onClick, name, value }) {
  

  return (
    <div>
      <IconButton
        onClick={ onClick }
        name={ name }
        value={ value }
        sx={{
          color: value ? 'red' : 'gray', 
          transition: 'color 0.3s', 
        }}
      >
        <FavoriteIcon sx={{ fontSize: '40px' }} />
      </IconButton>
    </div>
  );
}

LoveButton.propTypes = {
  title: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired 
}


























// import React, { useState } from 'react'
// import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
// import IconButton from '@mui/material/IconButton';
// import PropTypes from 'prop-types';

// function LoveButton({ title, movieId, onClick, value, name }) {

//     const [isMouseOver, setMouseOver] = useState(false); 
//     const [isLiked, setLiked] = useState(false);

//     function handleMouseOver() {
//         setMouseOver(true);
//     }

//     function handleMouseOut() {
//         setMouseOver(false);
//     }

//     function onClick() {
//         setLiked(!isLiked); 
//         console.log("Heart button clicked!");        
//    };

 

//   return (
//     <div>
//         <IconButton 
//             name={ name }
//             onClick={ onClick }
//             value={ isLiked }
//             onMouseOver={handleMouseOver} 
//             onMouseOut={handleMouseOut}
//         >     
//             <FavoriteTwoToneIcon 
//                 sx={{ 
//                     color: isLiked ? 'red' : (isMouseOver ? 'purple' : 'blue'), 
//                     fontSize: isLiked ? "50px" : "40px",
//                 }} 
//             />
//         </IconButton>      
//     </div>
//   )
// }

// export default LoveButton

// LoveButton.propTypes = {
//     id: PropTypes.number,
//     title: PropTypes.string
// }
