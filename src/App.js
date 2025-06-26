import logo from './logo.svg';
import './App.css';
import React from 'react';
import { sum } from './utilities/sum';

function App() {

  React.useEffect(() => {
    console.log(`here comes in sum --  ${sum(1)(2)}`);
    alert(sum(1)(2));
  }, []);

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
      </header>
    </div>
  );
}

export default App;
