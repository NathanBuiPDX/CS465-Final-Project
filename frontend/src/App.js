import './App.css';
import NavBar from "./components/NavBar";
import NewsFeed from "./pages/NewsFeed";
import UserPage from './pages/UserPage';
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import {InfoContext} from './components/InfoProvider';
function App() {
  const context = useContext(InfoContext);
  const user = context.currentUser;
  return  (
      <div className='app'>
        <Router>
          <Routes>
            <Route exact path='/' element={user ? <NewsFeed/> : null}/>
            <Route path='user/:userID' element={<UserPage/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
