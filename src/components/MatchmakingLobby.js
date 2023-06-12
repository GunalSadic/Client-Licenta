import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import { Button } from '@mui/material';

function MatchmakingLobby(){
    const [connection,setConnection] = useState();  

    const handleClick = async () =>{
        try{
            const connection = new HubConnectionBuilder().
            withUrl("https://localhost:7244/GameHub").
            configureLogging(LogLevel.Information).build();
            await connection.start();
            setConnection(connection);
        }
        catch (error){
            console.log(error)
        }
    }


    return(
        <>
            <Button onClick={handleClick}>Find game</Button>
        </>
    )
}

export default MatchmakingLobby;