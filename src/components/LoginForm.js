import { useState } from "react";
import {Box, TextField,Button, Typography} from '@mui/material';
import ClickableTypography from "./ClickableTypography";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
    };
  
    return (<Box p={2} width={1} maxWidth={600} sx={{border: '1px solid black', borderRadius: '15px', background: 'white'}}>
      <form onSubmit={handleSubmit}>
      <Box mb={2}>
          <Typography>Login</Typography>
        </Box>
        <Box mb={2}>
          <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
        </Box>
        <Box mb={2}>
            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth/>
        </Box>
        <Box mb={1} justifyContent={'space-between'} display={'flex'}>
            <ClickableTypography variant="p3" color="blue">Forgotten password</ClickableTypography>
            <ClickableTypography variant="p3" color="blue" >Create an account</ClickableTypography>
        </Box>
        <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
      </form>
      </Box>
    );
  }
  

  export default LoginForm;