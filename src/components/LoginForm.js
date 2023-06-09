import { useContext, useState } from "react";
import {Box, TextField,Button, Typography,Link} from '@mui/material';
import ClickableTypography from "./ClickableTypography";
import axios from 'axios';
import FormErrors from './FormErrors';
import { getClaims, saveToken } from "../authentication/HandleJWT";
import AuthenticationContext from "../authentication/AuthenticationContext";
import { useNavigate } from 'react-router-dom';
function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      try{
        const response = await axios.post(`https://localhost:7244/api/accounts/login`,{
          email: email,
          password: password
        }) 
        saveToken(response.data);
        props.updateClaims(getClaims());
        navigate('/');
      }
      catch (error){
        setErrors(error.response.data)
      }
    };
    
    return (
    <Box p={2} width={1} maxWidth={600} sx={{border: '1px solid black', borderRadius: '15px', background: 'white'}}>
      <FormErrors errors={errors}></FormErrors>
      <form onSubmit={handleSubmit}>
      <Box mb={2}>
          <Typography>Login</Typography>
        </Box>
        <Box mb={2}>
          <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
        </Box>
        <Box mb={2}>
            <TextField id="outlined-basic" type='password' label="Password" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth/>
        </Box>
        <Box mb={1} justifyContent={'space-between'} display={'flex'}>
            <ClickableTypography variant="p3" color="blue">Forgotten password</ClickableTypography>
            <ClickableTypography variant="p3" color="blue" >
              <Link href='/Register'>
              Create an account
              </Link>
            </ClickableTypography>
        </Box>
        <Button disabled = {!email || !password} variant="contained" color="primary" type="submit" inac>
        Submit
      </Button>
      </form>
    </Box>
    );
  }
  

  export default LoginForm;