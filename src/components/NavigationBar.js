import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import Authorized from '../authentication/Authorized';
import { logout } from '../authentication/HandleJWT';
import AuthenticationContext from '../authentication/AuthenticationContext';
import { useContext } from 'react';
import { getClaims } from '../authentication/HandleJWT';
function NavigationBar() {
    const toolbarStyle = {
        display: 'flex' ,
        flexDirection:'row',
        backgroundColor: '#E78F27'
      };
    
    function getUserEmail(){
      try{
        return getClaims().filter(x => x.name === 'username')[0].value;
      }
      catch{
        console.log("Navigation Bar error, claims was probably empty")
      }
    }
  return (
    <AppBar position="static">
      <Toolbar style={toolbarStyle} >
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }} ml={1}>
          AvatarChess
      </Typography>
        <Box ml={1}>  
            <Authorized authorized ={ <Button color="inherit" sx={{ mr: 2 }} href = "/Table">Find Game</Button>} notAuthorized ={<></>}>
            </Authorized>
            <Button color="inherit" sx={{ mr: 2 }} href ="/Leaderboards">Leaderboards</Button>
        </Box>
        <Box marginLeft={'auto'}> 
           <Authorized
           authorized={<>
           <Typography variant="inherit" color="inherit" sx={{ mr: 2 }}>Hello {getUserEmail()}</Typography>
           <Button variant="inherit" color="inherit" sx={{ mr: 2 }} href="\Login" onClick={logout}>Logout</Button>
           <Button color="inherit" sx={{ mr: 2 }} href = "/AvatarCreator">Avatar</Button>
           </>}
           notAuthorized={<> <Button variant="inherit" color="inherit" sx={{ mr: 2 }} href="\Login">Login</Button>
           <Button variant="inherit" color="inherit" href="Register">Sign Up</Button></>}
           ></Authorized>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
