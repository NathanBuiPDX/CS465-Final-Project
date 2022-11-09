import Home from "./pages/Home";
import InfoProvider from "./components/InfoProvider";
function App() {
  return  (
    <InfoProvider> 
      <Home/>
    </InfoProvider>
  );
}

export default App;
