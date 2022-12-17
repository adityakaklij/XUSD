
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Hackathon from './Components/Hackathon';
import Hosthackathon from './Components/Hosthackathon';


function App() {
  return (
    <>
      <HashRouter basename='/'>
    <div className="App">
       <Navbar/>

      <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/Hackathon">
            <Hackathon/>
          </Route>

          <Route exact path="/Hosthackathon">
            <Hosthackathon/>
          </Route>


          
        </Switch>

    </div>
    </HashRouter>
    </>
  );
}

export default App;
