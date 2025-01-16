import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import PropType from 'prop-types';


/* 
  NOTE: I believe that I can still use the map method and provide some predefined tags to the user as well. 
         If we wanted to add some cowboy slang tags we could provide those, or... maybe we could take the tags
         that users have already created and populate a tagsList for the users to access as well as create their own

         options={[]} : we can make predefined tags
         freeSolo : is allowing user to create their own tags
*/


//onChange is passed down to the child TagInput

export default function InputTags({ onChange }) {
  const [tags, setTags] = useState([]); 

  //function is triggered, and the inputs are trimmed of whitespaces, updated local tags state and then the trimmed tags are passed to the parent component (AwardMovieReview) and sets them.
  const handleTagsChange = (event, newTags) => {
    const trimmedTags = newTags.map(tag => tag.trim());
    setTags(trimmedTags);
    onChange(trimmedTags);
};

  return (
    <Stack spacing={ 3 } sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-free-solo"
        options={ [] } 
        freeSolo 
        value={ tags } 
        onChange={ handleTagsChange } 
        renderInput={(params) => (
          <TextField 
            {...params}
            label="Add tags"
            placeholder="Create a tag..."
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#212121", // <-- changes the background of the actual text box
                color: "Teal", // <--- changes the color of the text for tag entry
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00bfa5", // <--changes the border color (when not hovered over)
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#827717",  
                borderWidth: "2px",      
                boxShadow: "0 0 8px 2px rgba(130, 119, 23, 0.6)", // <-- found a glowing effect on the input field
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0d47a1", // <-- changes border color when it is actually clicked on and user is writing (focused)
              },
              "& .MuiInputBase-input::placeholder": {
                color: "white",  
              },
              "& .MuiInputLabel-root": {
                color: "#00bfa5",  
              },
              "& .MuiAutocomplete-clearIndicator": {   // <--- making the X red for now
                color: "#f44336",  
                "&:hover": {
                  color: "#d32f2f", 
                },
              }
            }}
            />
          )}
          renderTags={(value, getTagProps) => 
            value.map((option, index) => (
              <Chip
                key={ index }
                label={ option }
                {...getTagProps({ index })}
                sx={{
                  backgroundColor: "#00838f", 
                  color: "#fff",             
                  margin: "4px",             
                  "&:hover": {
                    backgroundColor: "#ffb300",  
                  },
                }}
              />
            ))
          }
        />
    </Stack>
  );
}

InputTags.PropType = {
  onChange: PropType.func.isRequired
}


//TODO: add validation for onTagsChange -- I thought it would be a function ??