import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, BrowserRouter as Router } from "react-router-dom"

import Calculate from './apps/Calculate'
import Puzzle from './apps/Puzzle'
import Test from './apps/Roulette'

function App() {
  return (
    <>
      <Router>
      <Link to="/">
          Empty
      </Link>
      <Link to="/TEST">
          Test
      </Link>
        <Link to="/calculate">
          Calculate
        </Link>
        <Link to="/puzzle">
          Puzzle
        </Link>
        <main>
          <Route path="/Test" component={()=>{
            return <Test />
          }} />
          <Route path="/calculate" component={()=>{
            return <Calculate />
          }} />
          <Route path="/puzzle" component={()=>{
            return <Puzzle />
          }} />
        </main>
      </Router>
    </>
  );
}

export default App;
