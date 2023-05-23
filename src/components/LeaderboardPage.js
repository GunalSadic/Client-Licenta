import CardList from "./CardList";
import { Pagination, Container, Box } from "@mui/material";

function LeaderboardPage(){
    return(
    <Container>
        <CardList></CardList>
        <Box  display="flex" justifyContent="center">
        <Pagination count={10}/>
        </Box>
    </Container>
    )
}

export default LeaderboardPage