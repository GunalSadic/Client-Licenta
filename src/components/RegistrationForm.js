import { useContext, useState } from "react";
import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getClaims, saveToken } from "../authentication/HandleJWT";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ClickableTypography from "./ClickableTypography";
import axios from 'axios';
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Link
} from '@mui/material';
import AuthenticationContext from "../authentication/AuthenticationContext";
import FormErrors from "./FormErrors";
  

const RegistrationForm = (props) => {
  const [backendErrors,setBackendErrors] = useState([]);
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/.*[!@#$%^&*]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
  });
  const {setClaims} = useContext(AuthenticationContext); 
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = async (data) => {
    try{
      var response = await axios.post('https://localhost:7230/api/accounts/create',{
        email: data.email, password: data.password, username: data.username})
      saveToken(response.data);
      setClaims(getClaims());
      navigate('/');
    }
    catch(e){
      setBackendErrors(e.response.data)
    }
  };

  
  return (
      <Box p={2} width={1} maxWidth={600} sx={{border: '1px solid black', borderRadius: '15px', background: 'white'}}>
        <FormErrors errors={backendErrors}></FormErrors>
        <Typography>Register</Typography>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                margin="dense"
                {...register('username')}
                error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                margin="dense"
                {...register('password')}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                margin="dense"
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
            <ClickableTypography variant="p3" color="blue" >
              <Link href='/Login'>
              Already have an account, login!
              </Link>
            </ClickableTypography>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Box>
        </Box>
  );
};

export default RegistrationForm;
