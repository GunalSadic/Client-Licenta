import { HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Button,Box, Typography,Grid } from '@mui/material';
import { getClaims } from '../authentication/HandleJWT';
import ChessGame from './ChessBoard';
import { Chess } from 'chess.js';
import Chessboard from 'chessboardjsx';
import { Avatar } from '@readyplayerme/visage';
import Chessground from "@react-chess/chessground/build/esm"
import { toDests } from '../ChessLogic/Logic';
import "../styles/chessground.base.css"
import "../styles/chessground.brown.css"
import "../styles/chessground.cburnett.css"
import { Chessground as ChessgroundApi } from 'chessground';
function MatchmakingLobby(){
    ChessgroundApi
    const [connection,setConnection] = useState();  
    const [queuePlayerCount, setQueuePlayerCount] = useState();
    const userEmail = getClaims().filter(x => x.name === 'email')[0].value;
    const [opponentEmail, setOpponentEmail] = useState();
    const chess = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(chess.fen());
    const [color,setColor] = useState('white');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [user1AvatarData, setUser1AvatarData] = useState(null);
    const [user2AvatarData, setUser2AvatarData] = useState(null);
    const chessgroundRef = useRef(null);
    useEffect(() => {
      // Fetch avatar data for the first user
      fetch('https://models.readyplayer.me/6470fcc1d71bf8b85c3b006d.glb')
        .then(response => response.blob())
        .then(data => setUser1AvatarData(data));
  
      // Fetch avatar data for the second user
      fetch('https://models.readyplayer.me/6470fcc1d71bf8b85c3b006d.glb')
        .then(response => response.blob())
        .then(data => setUser2AvatarData(data));
    }, []);
    const MatchFound = (response) =>{
        let data = JSON.parse(response);
        console.log(data);
        if(userEmail === data.player1Email){
            setColor(data.player1Color);
            setOpponentEmail(data.player2Email);
        }
        else{
            setColor(data.player2Color);
            setOpponentEmail(data.player1Email);
        }
        
    }
    const handleClick = async () =>{
        try{
            setButtonDisabled(true);
            
            const token = localStorage.getItem('token')
            const connection = new HubConnectionBuilder().
            withUrl("https://localhost:7244/GameHub",{
                accessTokenFactory: ()=> {return `Bearer ${token}`},  
              }).

            configureLogging(LogLevel.Information).build(); 
            connection.on("QueuePlayerCountUpdate",(playerCount)=>{console.log(playerCount)});
            connection.on("MatchFound",(response) => MatchFound(response));
            connection.on("ReceiveMove",(origin,dest) => {handleMove(origin,dest,false)});
            connection.on("ReceiveMessage", (message) => console.log(message));
            await connection.start();
            await connection.invoke("JoinQueue",userEmail);
            setConnection(connection);
        }
        catch (error){
            console.log(error)
        }
    }
    const handleMove = (origin,dest,sendOver = true) => {
        try{
            var move;
            move = origin+dest;
            if(chess.turn() === color[0] || sendOver == false){
                chess.move(move);
                setFen(chess.fen());
                if(sendOver === true)
                {
                    let moveJSON = JSON.stringify({
                        origin : origin,
                        dest : dest,
                        userEmail: userEmail,
                        opponentEmail: opponentEmail
                    })
                    connection.invoke("MakeMove", moveJSON);
                }
            }
        }
       catch(error){
        console.log(error)
        
       }
     
    }
    if(opponentEmail){
        return(
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
                >
                <Typography variant='h6'>{opponentEmail}</Typography>
                <Avatar modelSrc={user2AvatarData}/>
              
                <Chessground
                ref={chessgroundRef}
                width={400}
                height={400}
                config={
                    {addPieceZIndex: true, orientation: color, events: {move: handleMove}, 
                    movable:{dests: toDests(chess), free: false, color: color}}
                }
            />
                <Typography variant='h6'>{userEmail}</Typography>
                <Avatar modelSrc={user1AvatarData}/>
            </Grid>
        )
    }
  

    return(
        <>
            <Button onClick={handleClick} disabled = {buttonDisabled}>Find game</Button>
        </>
    )

}

export default MatchmakingLobby;
