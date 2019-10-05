import React from 'react';
import logo from './logo.svg';
import './App.css';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || ''

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li><a href={`${ENDPOINT}/list`}>{`${ENDPOINT}/list`}</a></li>
          <li><a href={`${ENDPOINT}/sign-up`}>{`${ENDPOINT}/sign-up`}</a></li>
          <li><a href={`${ENDPOINT}/send-report`}>{`${ENDPOINT}/send-report`}</a></li>
        </ul>
      </header>
    </div>
  );
}

export default App;
