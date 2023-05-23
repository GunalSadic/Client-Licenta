import React, {useState} from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { Chess } from "chess.js";


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

const handleMove = (move) => {
    // Line 29 validates the user move.
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
    }
  };

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
    </div>
  );
}

export default ChessGame;