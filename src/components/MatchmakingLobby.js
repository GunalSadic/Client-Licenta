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
import { HttpTransportType } from '@microsoft/signalr';
import axios from 'axios';
function MatchmakingLobby(){
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
    const [user1AvatarUrl, setUser1AvatarUrl] = useState(null);
    const [user2AvatarUrl, setUser2AvatarUrl] = useState(null);
    const [forcedUpdatesCount, setForcedUpdatesCount] = useState(0);
    const chessgroundRef = useRef(null);
    useEffect(() => {
        if (opponentEmail) {
            var encodedUserEmail = encodeURIComponent(userEmail);
            var encodedOpponentEmail = encodeURIComponent(opponentEmail);
          axios.get(`https://localhost:7230/api/players/${encodedUserEmail}/${encodedOpponentEmail}`)
            .then((response) => {
              const { userUrl, opponentUrl } = response.data;
              setUser1AvatarUrl(userUrl);
              setUser2AvatarUrl(opponentUrl);
            })
            .catch((error) => {
              // Handle any errors that occur during the request
              console.error(error);
            });
        }
      }, [opponentEmail]);

    useEffect(() => {
    if(user1AvatarUrl && user2AvatarUrl){
      fetch(user1AvatarUrl)
        .then(response => response.blob())
        .then(data => setUser1AvatarData(data));
  
      fetch(user2AvatarUrl)
        .then(response => response.blob())
        .then(data => setUser2AvatarData(data));}
    }, [user1AvatarUrl,user2AvatarUrl]);
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
            withUrl("https://localhost:7230/GameHub",{
                accessTokenFactory: ()=> {return `${token}`},  
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
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
            if(!(chess.turn() === color[0]) && sendOver == true)
                throw new Error('Not your turn!')
            var move;
            move = origin+dest;
            var moveChecker = new Chess(chess.fen());
            moveChecker.move(move);
            chess.move(move);
            var gameResult;
            setFen(chess.fen());
            if(chess.isCheckmate())
                if(chess.turn() !== color[0])
                {
                    gameResult = 1;
                    console.log(`${userEmail} has won the game`)
                }
            if(chess.isDraw()){
                gameResult = 0;
            }
            // post game results and update opponentEmail to null
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
       catch(error){
        setForcedUpdatesCount(forcedUpdatesCount+1);
        console.log(error)
       }
     
    }
    
    useEffect(() => {
        setFen(chess.fen());
    }, [fen]);
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
                    {addPieceZIndex: true, orientation: color, events: {move: handleMove }, fen: fen}
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
