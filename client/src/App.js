import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from './pages/Search';
import Saved from './pages/Saved';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch >
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;