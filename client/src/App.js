import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from './components/Wrapper/Wrapper';
import Search from './pages/Search';
import Saved from './pages/Saved';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Wrapper >
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;
