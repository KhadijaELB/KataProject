import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateSecondPlayerComponent from './components/CreateSecondPlayerComponent';
import CreateFirstPlayerComponent from './components/CreateFirstPlayerComponent';
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
                          <Route path = "/" exact component = {CreateFirstPlayerComponent}></Route>
                          <Route path = "/createFirstPlayer" component = {CreateFirstPlayerComponent}></Route>
                          <Route path = "/createSecondPlayer" component = {CreateSecondPlayerComponent}></Route>
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
