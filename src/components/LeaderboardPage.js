import { Card, CardContent, List, ListItem, Typography, Container, Box ,Pagination } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

 function  LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        const response = await axios.get(`https://localhost:7230/api/players?page=${page}&pageSize=${pageSize}`);
        setLeaderboard(response.data.players);
        setTotalItems(response.data.totalItems);
      }
      catch(error){
        console.log(error);
      }
    };

    fetchData();
  },[page,pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const CardItems = leaderboard.map((item) => (
    <Card key={item.name} sx={{ m: 0.5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Elo: {item.elo}
        </Typography>
      </CardContent>
    </Card>
  ));

  return (<Container>
    <List sx={{ display: "flex", flexWrap: "wrap" , flexDirection:"column"}}>{CardItems}</List>
    <Box  display="flex" justifyContent="center">
    <Pagination  
          count={Math.ceil(totalItems / pageSize)}
          page={page}
          onChange={handlePageChange}/>
    </Box>
    </Container>
  );
}

export default LeaderboardPage
  
