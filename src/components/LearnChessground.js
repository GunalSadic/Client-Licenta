import Chessground from "@react-chess/chessground/build/esm"
import "../styles/chessground.base.css"
import "../styles/chessground.brown.css"
import "../styles/chessground.cburnett.css"
import { Grid ,Box} from "@mui/material"
import { useRef , useEffect} from "react"
import {Chessground as chessgroundApi} from 'chessground'
function Demo() {
  const testRef = useRef(null);
  const handleMove =() => {
    var test = testRef.current;
  }
  useEffect(() => {
    handleMove();
  }, []);
  return (
    <Box  
    display='flex'
    justifyContent='center'
    >
        <Chessground
        id = "chessboard"
        width={400}
        height={400}
        ref={testRef}
        position="start"
        config={
            {addPieceZIndex: true, orientation:"black", events: {move: handleMove}}
          }
      />
    </Box>
    
  ) 
  
}

export default Demo