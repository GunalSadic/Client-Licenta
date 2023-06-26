import { HubConnectionBuilder, LogLevel, HttpTransportType} from '@microsoft/signalr';
import { useState } from 'react';
import { Button,Box, Typography } from '@mui/material';
import { getClaims } from '../authentication/HandleJWT';
import ChessGame from './ChessBoard';
import { Chess } from 'chess.js';
import Chessboard from 'chessboardjsx';
function MatchmakingLobby(){
    
    const [connection,setConnection] = useState();  
    const [queuePlayerCount, setQueuePlayerCount] = useState();
    const userEmail = getClaims().filter(x => x.name === 'email')[0].value;
    const [opponentEmail, setOpponentEmail] = useState();
    const chess = new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    const [fen, setFen] = useState(chess.fen());
    const [color,setColor] = useState('white');
    const [yourTurn,setYourTurn] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(false);
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
            connection.on("ReceiveMove",(move) => handleMove(move,false));
            connection.on("ReceiveMessage", (message) => console.log(message));
            await connection.start();
            await connection.invoke("JoinQueue",userEmail);
            setConnection(connection);
        }
        catch (error){
            console.log(error)
        }
    }
    const handleMove = (move,sendOver = true) => {
        try{
            if(chess.turn() === color[0] || sendOver == false){
                const moveChecker = new Chess(chess.fen());
                moveChecker.move(move);
                chess.move(move);
                setFen(chess.fen());
                if(sendOver === true)
                {
                    let moveJSON = JSON.stringify({
                        move: move.from + move.to,
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
            <Box >
                 <Typography variant='h6'>{userEmail} vs {opponentEmail}</Typography>
                 <Chessboard
                  orientation = {color}
                  width={400}
                  position={fen}
                  onDrop={(move) =>
                    handleMove({
                      from: move.sourceSquare,
                      to: move.targetSquare,
                      promotion: "q"
                    })
                  }
                 ></Chessboard>
            </Box>
        )
    }
  

    return(
        <>
            <Button onClick={handleClick} disabled = {buttonDisabled}>Find game</Button>
        </>
    )

}

export default MatchmakingLobby;