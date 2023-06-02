import React from 'react';
import LoginForm from './LoginForm';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

function LoginPage() {
    return (
      
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
         <LoginForm />
      </Grid> 
    );
  }
  
  export default LoginPage;