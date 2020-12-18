import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import {TweetsComponent} from './tweets';
import {Navbar} from './navbar';
import './App.css';


function App() {

  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        <div>
          <TweetsComponent/>
        </div>
      </header>
    </div>
  );
}

export default App;
