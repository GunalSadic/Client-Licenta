import React from 'react';
import RegistrationForm from './RegistrationForm';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import NavigationBar from './NavigationBar';
function RegistrationPage(setClaims) {
    return (
      <Box>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh'}}
    >
         <RegistrationForm />
      </Grid> </Box>
    );
  }
  
  export default RegistrationPage;