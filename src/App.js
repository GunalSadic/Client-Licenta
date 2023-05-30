import NavigationBar from './components/NavigationBar';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LeaderboardPage from './components/LeaderboardPage';
import ChessGame from './components/ChessBoard';
import AvatarCreator from './components/AvatarCreator'

function App() {
  return (
  <Router>
    <NavigationBar></NavigationBar> 
    <Routes>
      <Route path ="/">
        <Route path="/Login" element = {<LoginPage/>}></Route>
        <Route path ="/Register" element = {<RegistrationPage/>}></Route>
        <Route path="/Leaderboards" element = {<LeaderboardPage/>}></Route>
        <Route path="/Table" element = {<ChessGame/>}></Route>
        <Route path="/AvatarCreator" element = {<AvatarCreator/>}></Route>
      </Route>
    </Routes>
  </Router>
  );
}
export default App;
