import { AvatarCreator, AvatarCreatorViewer } from '@readyplayerme/rpm-react-sdk';
import { Box } from '@mui/material';
import { useState } from 'react';
export default function App() {
    const [url, setUrl] = useState("");
    const MY_SUBDOMAIN = "bachelors-degree"
    const handleAvatarExported = (url) => {
        setUrl(url);
      };
    return (
        <div style = {{height:"100vh"}}> 
            <AvatarCreatorViewer subdomain={MY_SUBDOMAIN} onAvatarExported={handleAvatarExported}/>
        </div>
    );
}
