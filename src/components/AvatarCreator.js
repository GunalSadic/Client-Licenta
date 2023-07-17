import { AvatarCreator, AvatarCreatorViewer } from '@readyplayerme/rpm-react-sdk';
import { Box } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { getClaims } from '../authentication/HandleJWT';
export default function App() {
    const [url, setUrl] = useState("");
    const MY_SUBDOMAIN = "bachelors-degree"
    const handleAvatarExported = (url) => {
        var AvatarUrlDTO = {
            newAvatarUrl: url
        };
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
        axios.put('https://localhost:7230/api/players', AvatarUrlDTO, { headers })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
      };
    
      const config  = {
        clearCache: true
      };
    return (
        <div style = {{height:"100vh"}}> 
            <AvatarCreatorViewer subdomain={MY_SUBDOMAIN} onAvatarExported={handleAvatarExported} 
            editorConfig={config}/>
        </div>
    );
}
