import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePlayersComponent from './components/CreatePlayersComponent';
import ListGameComponent from './components/ListGameComponent';
import GameComponent from './components/GameComponent';
//import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {CreatePlayersComponent}></Route>
                          <Route path = "/createPlayer" component = {CreatePlayersComponent}></Route>
                          <Route path='/ListGames' component={ListGameComponent} />
                          <Route path='/BoardGame' component={GameComponent} />
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
