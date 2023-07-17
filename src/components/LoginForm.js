import { useContext, useState } from "react";
import {Box, TextField,Button, Typography,Link} from '@mui/material';
import ClickableTypography from "./ClickableTypography";
import axios from 'axios';
import FormErrors from './FormErrors';
import { getClaims, saveToken } from "../authentication/HandleJWT";
import AuthenticationContext from "../authentication/AuthenticationContext";
import { useNavigate } from 'react-router-dom';
function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors] = useState([]);
    const [info,setInfo] = useState('')
    const navigate = useNavigate();
    const {setClaims} = useContext(AuthenticationContext); 
    const handleSubmit = async (event) => {
      event.preventDefault();
      try{
        const response = await axios.post(`https://localhost:7230/api/accounts/login`,{
          username: username,
          password: password
        }) 
        saveToken(response.data);
        setClaims(getClaims());
        navigate('/');
      }
      catch (error){
        setInfo(error.response.data)
      }
    };
    
    return (
    <Box p={2} width={1} maxWidth={600} sx={{border: '1px solid black', borderRadius: '15px', background: 'white'}}>
      <p>{info}</p>
      <form onSubmit={handleSubmit}>
      <Box mb={2}>
          <Typography>Login</Typography>
        </Box>
        <Box mb={2}>
          <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)} fullWidth />
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
        <Button disabled = {!username || !password} variant="contained" color="primary" type="submit" inac>
        Submit
      </Button>
      </form>
    </Box>
    );
  }
  

  export default LoginForm;