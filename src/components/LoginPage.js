import React from 'react';
import LoginForm from './LoginForm';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { ToastContainer } from 'react-toastify';
function LoginPage(props) {
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
         <LoginForm updateClaims={props.updateClaims}/>
      </Grid> 
    );
  }
  
  export default LoginPage;