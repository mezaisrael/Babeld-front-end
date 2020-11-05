import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import {TweetsComponent} from './tweets';
import './App.css';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetsComponent/>
        </div>
      </header>
    </div>
  );
}

export default App;
