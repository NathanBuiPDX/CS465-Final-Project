import './App.css';
import NavBar from "./components/NavBar";
import NewsFeed from "./pages/NewsFeed";
import UserPage from './pages/UserPage';
import Register from './pages/Register';
import Login from "./pages/Login";

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
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={user ? NewsFeed : null} />
          <Route path="/user/:userID" component={UserPage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
