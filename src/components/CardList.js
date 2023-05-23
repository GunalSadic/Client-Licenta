import { Card, CardContent, List, ListItem, Typography } from "@mui/material";

function CardList() {
  const Leaderboard = [
    { name: "Gunal", Elo: "2300" },
    { name: "Isildur", Elo: "2500" },
    { name: "TurboRandom", Elo: "900" },
    { name: "John Doe", Elo:"1100"},
    {name: "Cristi", Elo:"500"}
  ];

  // Sort leaderboard by Elo
  Leaderboard.sort((a, b) => b.Elo - a.Elo);

  const CardItems = Leaderboard.map((item) => (
    <Card key={item.name} sx={{ m: 0.5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Elo: {item.Elo}
        </Typography>
      </CardContent>
    </Card>
  ));

  return <List sx={{ display: "flex", flexWrap: "wrap" , flexDirection:"column"}}>{CardItems}</List>;
}

export default CardList;
