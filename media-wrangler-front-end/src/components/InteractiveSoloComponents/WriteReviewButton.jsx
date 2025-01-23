import React, { useState } from 'react'
import { IconButton, Fab } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';


function WriteReviewButton({ title, id, onClick }) {



  return (
    <div>
        <IconButton 
            onClick={ onClick }
        >   
            <Fab color="primary" aria-label="edit">
                <EditIcon />
            </Fab>  
        </IconButton>  
    </div>
  )
}

export default WriteReviewButton

WriteReviewButton.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string, 
    onClick: PropTypes.func.isRequired
}

/*

NOTE:   I believe that maybe the location.state can be used to pass the username and userId down to the MovieReviewForm and InteractionsCard 
        to help store their data properly. 

TODO:   Look at local storage in order to set the username to the reviews

        if we use the location tracker and nothing is returned, then that means that a user is not logged in -- at which point I can have an alert that tells 
        the they must login to use those features (or register if they have not already)

NOTE:   I will probably need to have a table for ratings and likes in addition to the reviews table. Some users will not want to write full 
        reviews and this will help keep track of the stats on the movies, and can still be mappedBy the user_id

 */


