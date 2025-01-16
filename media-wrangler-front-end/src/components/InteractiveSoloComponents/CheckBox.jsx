import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

const label = { inputProps: { 'aria-label': 'Does review contain spoilers?' } }; //<--- was with the code from mui, allows for screen readers to pick up what input is

export default function ColorCheckboxes({ name, value, checked, onChange }) {
  return (
    <div>
      <Checkbox
        name={ name }
        value={ value }
        checked={ checked }
        onChange={ onChange }
        {...label}
        sx={{
          color: "#0d47a1", 
          '&.Mui-checked': {
            color: "#2196f3", 
          },      
        }}
      />
    </div>
  );
}

ColorCheckboxes.propTypes = {
  name: PropTypes.string.isRequired,  
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired, 
};