import './App.css';
import InfoProvider from "./components/InfoProvider";
import NavBar from "./components/NavBar";
import NewsFeed from "./pages/NewsFeed";
import UserPage from './pages/UserPage';
function App() {
  return  (
    <InfoProvider> 
      <div className='app'>
          <NavBar/>
          <div className='feedPage'>
              <NewsFeed/>
          </div>
          {/* <div className='userPage'>
              <UserPage/>
          </div> */}
      </div>
    </InfoProvider>
  );
}

export default App;
