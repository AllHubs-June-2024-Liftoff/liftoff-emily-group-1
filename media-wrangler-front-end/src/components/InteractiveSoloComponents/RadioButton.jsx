import * as React from 'react';
import Radio from '@mui/material/Radio';
import PropTypes from 'prop-types';

export default function ColorRadioButtons({ name, value, checked, onChange }) {
    return (
      <Radio
        name={ name }
        value={ value }
        checked={ checked }
        onChange={ onChange }
        sx={{
          color: "#0d47a1",
          '&.Mui-checked': {
            color: "#2196f3",
          },
        }}
      />
    );
}

  
ColorRadioButtons.propTypes = {
  name: PropTypes.string.isRequired,  
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired, 
};