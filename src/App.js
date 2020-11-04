import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import {TweetForm, TweetList} from './tweets';
import './App.css';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetForm/>
          <TweetList/>
        </div>
      </header>
    </div>
  );
}

export default App;
