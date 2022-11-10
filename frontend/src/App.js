import './App.css';
import InfoProvider from "./components/InfoProvider";
import NavBar from "./components/NavBar";
import NewsFeed from "./pages/NewsFeed";
function App() {
  return  (
    <InfoProvider> 
      <div className='bg-dark app'>
          <NavBar/>
          <div className='feedPage'>
              <NewsFeed/>
          </div>
      </div>
    </InfoProvider>
  );
}

export default App;
