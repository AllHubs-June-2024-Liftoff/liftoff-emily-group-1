import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PropType from 'prop-types';


export default function DescriptionAlerts({ alertType, alertTitle, alertMessage, variant }) {
  return (

      <Alert 
        variant={ variant }
        severity={ alertType } >
        <AlertTitle>{ alertTitle }</AlertTitle>
        { alertMessage }
      </Alert>
     
    
  );
}

DescriptionAlerts.propTypes = {
  alertType: PropType.string.isRequired,
  alertTitle: PropType.string.isRequired,
  alertMessage: PropType.string.isRequired,
  variant: PropType.string
}