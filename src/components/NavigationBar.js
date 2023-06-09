import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import Authorized from '../authentication/Authorized';
import { logout } from '../authentication/HandleJWT';
function NavigationBar() {
    const toolbarStyle = {
        display: 'flex' ,
        flexDirection:'row',
        backgroundColor: '#E78F27'
      };
  return (
    <AppBar position="static">
      <Toolbar style={toolbarStyle} >
      <a href="\">
      
      </a>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }} ml={1}>
          Eloker
      </Typography>
        <Box ml={1}>  
            <Button color="inherit" sx={{ mr: 2 }} href = "/Table">Find Game</Button>
            <Button color="inherit" sx={{ mr: 2 }} href ="/Leaderboards">Leaderboards</Button>
        </Box>
        <Box marginLeft={'auto'}> 
           <Authorized
           authorized={<><Button variant="inherit" color="inherit" sx={{ mr: 2 }} href="\Login" onClick={logout()}>Logout</Button></>}
           notAuthorized={<> <Button variant="inherit" color="inherit" sx={{ mr: 2 }} href="\Login">Login</Button>
           <Button variant="inherit" color="inherit" href="Register">Sign Up</Button></>}
           ></Authorized>
        </Box>
        <Button color="inherit" sx={{ mr: 2 }} href = "/AvatarCreator">Avatar</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
