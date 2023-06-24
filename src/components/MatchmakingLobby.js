import { HubConnectionBuilder, LogLevel, HttpTransportType} from '@microsoft/signalr';
import { useState } from 'react';
import { Button,Box, Typography } from '@mui/material';
import { getClaims } from '../authentication/HandleJWT';
import ChessGame from './ChessBoard';
import { Chess } from 'chess.js';
function MatchmakingLobby(){
    
    const [connection,setConnection] = useState();  
    const userEmail = getClaims().filter(x => x.name === 'email')[0].value;
    const [opponentEmail, setOpponentEmail] = useState();
    const handleClick = async () =>{
        try{
            const token = localStorage.getItem('token')
            const connection = new HubConnectionBuilder().
            withUrl("https://localhost:7244/GameHub",{
                accessTokenFactory: ()=> {return `${token}`},  
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
              }).
            configureLogging(LogLevel.Information).build(); 
            connection.on("QueuePlayerCountUpdate",(playerCount)=>{console.log(playerCount)});
            connection.on("MatchFound",(email) => 
            {
                setOpponentEmail(email)
                console.log(email)
            }
            );
            await connection.start();
            await connection.invoke("JoinQueue",userEmail);
            setConnection(connection);
        }
        catch (error){
            console.log(error)
        }
    }

    if(opponentEmail){
        let emails = opponentEmail.split(' ');
        return(
            <Box >
                 <Typography variant='h6'>{emails[0]} vs {emails[1]}</Typography>
                <ChessGame></ChessGame>
            </Box>
        )
    }
  

    return(
        <>
            <Button onClick={handleClick}>Find game</Button>
        </>
    )

}

export default MatchmakingLobby;