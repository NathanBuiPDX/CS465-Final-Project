import './App.css';
import NavBar from "./components/NavBar";
import NewsFeed from "./pages/NewsFeed";
import UserPage from './pages/UserPage';
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
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
          <Switch>
            <Route exact path='/' component={user ? NewsFeed : null}/>
            <Route path='user/:userID' component={UserPage}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
