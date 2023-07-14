import NavigationBar from './components/NavigationBar';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LeaderboardPage from './components/LeaderboardPage';
import ChessGame from './components/ChessBoard';
import AvatarCreator from './components/AvatarCreator'
import { useState } from 'react';
import AuthenticationContext from './authentication/AuthenticationContext';
import { set } from 'react-hook-form';
import { getClaims } from './authentication/HandleJWT';
import MatchmakingLobby from './components/MatchmakingLobby';
import Demo from './components/LearnChessground';
function App() {

  const [claims,setClaims] = useState([]);
 
  return (
  <Router>
    <AuthenticationContext.Provider value = {{claims,setClaims}}>
    <NavigationBar></NavigationBar> 
    <Routes>
      <Route path ="/">
        <Route path="/Login" element = {<LoginPage/>}></Route>
        <Route path ="/Register" element = {<RegistrationPage />}></Route>
        <Route path="/Leaderboards" element = {<LeaderboardPage/>}></Route>
        <Route path="/Table" element = {<Demo/>}></Route>
        <Route path="/AvatarCreator" element = {<AvatarCreator/>}></Route>
        <Route path="/Test" element = {<Demo/>}></Route>
      </Route>
    </Routes>
    </AuthenticationContext.Provider>
  </Router>
  );
}
export default App;
