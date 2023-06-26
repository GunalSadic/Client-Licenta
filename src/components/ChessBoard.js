import React, {useState} from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { Chess } from "chess.js";
import { Avatar } from '@readyplayerme/visage';
import { useEffect } from "react";
// We are using FEN notation r - rook n - knight ...
const paddingStyle = {
    padding: 5
  }
  
  const marginStyle = {
    margin: 5
  }
  const chess =  new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")


function ChessGame(){

const [fen,setFen] = useState(chess.fen());
const modelSrc = "https://models.readyplayer.me/6470fcc1d71bf8b85c3b006d.glb"
const handleMove = (move) => {
    // Line 29 validates the user move.
    try{
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        // Lines 33-28: Computer random move.
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
        // Sets state of chess board
      setFen(chess.fen());
      if(chess.isGameOver)
      {
          
      }
    }}
    
    catch(exception){
      
    }
  };

  const [user1AvatarData, setUser1AvatarData] = useState(null);
  const [user2AvatarData, setUser2AvatarData] = useState(null);

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
  return (
    <div className="flex-center">
      <h1>Random Chess Game</h1>
      <Chessboard
        width={400}
        position={fen}
        // onDrop prop tracks everytime a piece is moved.
        // The rest is handled in the the handleMove function.
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            // This promotion attribute changes pawns to a queen if they reach the other side of the board.
            promotion: "q",
          })
        }
      />
      <Avatar modelSrc={user1AvatarData}/>
      <Avatar modelSrc={user2AvatarData}/>
    </div>  
  );
}

export default ChessGame;