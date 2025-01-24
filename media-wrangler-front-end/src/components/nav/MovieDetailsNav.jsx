import React, { useState } from 'react';
import { Card, Typography, Tabs, Tab, Box } from '@mui/material';



//TODO: Maybe incorporate a Chip to put the Cast and Crew names in their own button type style for display. I am going to use a color chip, but eventually being able to use the clickable link Chip would be great if we wanted users to be guided to a page for actor selected.
//TODO: Look into a layout for the other info to be displayed within the tab bar. I have to look at how the API is returning data first



function MovieDetailsNav({ movieDetails }) {
    
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    // parsing cast data
    let tabOneCastString = ``
    for (let i = 0; i < 10 && i < movieDetails.cast.length; i++) {
      tabOneCastString += `${movieDetails.cast[i].name} as ${movieDetails.cast[i].character}\n`
    }

    
    // parsing crew data
    let directors = ""
    let writers = ""
    let cinematographer = ""
    let editor = ""
    let casting = ""
    let producers = ""

    console.log(movieDetails.crew)
    for (let i = 0; i < movieDetails.crew.length; i++) {
      let crewMember = movieDetails.crew[i]
      
      if (crewMember.job.trim() == "Director") {
        if (directors === "") {
          directors += crewMember.name
        } else {
          directors += `, ${crewMember.name}`
        }
      }

      if (crewMember.job.trim() == "Writer" || crewMember.department.trim() == "Writing") {
        if (writers === "") {
          writers += crewMember.name
        } else {
          writers += `, ${crewMember.name}`
        }
      }

      if (crewMember.job.trim() == "Director of Photography") {
        if (cinematographer === "") {
          cinematographer += crewMember.name
        } else {
          cinematographer += `, ${crewMember.name}`
        }
      }

      if (crewMember.job.trim() == "Editor") {
        if (editor === "") {
          editor += crewMember.name
        } else {
          editor += `, ${crewMember.name}`
        }
      }

      if (crewMember.job.trim().includes("Casting")) {
        if (casting === "") {
          casting += crewMember.name
        } else {
          casting += `, ${crewMember.name}`
        }
      }

      if (crewMember.job.trim() == "Producer") {
        if (producers === "") {
          producers += crewMember.name
        } else {
          producers += `, ${crewMember.name}`
        }
      }
    }

    let tabTwoCrewString = 
    `Director(s): ${directors}
    Writer(s): ${writers}
    Cinematography: ${cinematographer}
    Editor(s): ${editor}
    Casting: ${casting}
    Producers: ${producers}
    `

    // creates an array of JSX Elements with new lines
    const renderWithLineBreaks = (text) => {
      return text.split('\n').map((line, index) => (
          <Typography key={index} variant="body2" color="white">
              {line}
          </Typography>
      ));
  };

    const tabData = {
        one: renderWithLineBreaks(tabOneCastString),
        two: renderWithLineBreaks(tabTwoCrewString),
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

