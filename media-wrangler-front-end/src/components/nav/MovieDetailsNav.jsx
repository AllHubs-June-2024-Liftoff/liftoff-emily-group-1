import React, { useState } from 'react';
import { Card, Typography, Tabs, Tab, Box } from '@mui/material';



//TODO: Maybe incorporate a Chip to put the Cast and Crew names in their own button type style for display. I am going to use a color chip, but eventually being able to use the clickable link Chip would be great if we wanted users to be guided to a page for actor selected.
//TODO: Look into a layout for the other info to be displayed within the tab bar. I have to look at how the API is returning data first



function MovieDetailsNav() {

    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    //Need to provide the tabs with data to display from API... will make dynamic once merged with API branch
    const tabData = {
        one: "Cast details go here",
        two: "Crew details go here",
        three: "Movie details go here",
        four: "Release dates go here",
        five: "Genres go here"
    };

  
    return (
        <>
          <Box 
            sx={{
            width: "500px",
            background: "#004d40", 
            padding: '10px', 
            borderRadius: '4px', 
            margin: "auto",
            marginBottom: "30px",
            border: "2px solid white"
            }} >
              <Tabs
                value={ value }
                onChange={ handleChange }
                indicatorColor="primary" 
                sx={{
                  '& .MuiTab-root': {
                    color: 'white',  // Set custom text color to white
                  },
                }}   
              >
                <Tab value="one" label="Cast" />
                <Tab value="two" label="Crew" />
                <Tab value="three" label="Details" />
                <Tab value="four" label="Releases" />
                <Tab value="five" label="Genres" />
              </Tabs>
              <Card 
                sx={{
                width: "450px",
                margin: "10px auto",
                border: "2px solid #ff8f00",
                background: "rgb(41, 43, 45)",
                padding: "10px"
                }} >
                <Typography variant="body2" color="white">
                    { tabData[value] }
                </Typography>            
              </Card>
            </Box>    
        </>
    );
}

export default MovieDetailsNav;

