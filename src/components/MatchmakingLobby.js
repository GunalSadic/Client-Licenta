import { HubConnectionBuilder, LogLevel, HttpTransportType} from '@microsoft/signalr';
import { useState } from 'react';
import { Button } from '@mui/material';
import { getClaims } from '../authentication/HandleJWT';

function MatchmakingLobby(){
    const [connection,setConnection] = useState();  
    const userEmail = getClaims().filter(x => x.name === 'email')[0].value;
    const handleClick = async () =>{
        try{
            const token = localStorage.getItem('token')
            const connection = new HubConnectionBuilder().
            withUrl("https://localhost:7244/GameHub",{
                accessTokenFactory: ()=> {return `Bearer ${token}`},  
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
              }).
            configureLogging(LogLevel.Information).build(); 
            connection.on("QueuePlayerCountUpdate",(playerCount)=>{console.log(playerCount)});
            connection.on("MatchFound",(email) => console.log(email));
            await connection.start();
            await connection.invoke("JoinQueue",userEmail);
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