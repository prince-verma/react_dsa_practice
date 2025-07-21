import React from "react";
import "./App.css";
import Joke from "./Joke";
import { Provider } from "react-redux";
import { store } from "./store";


function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <Joke />
      </div>
    </Provider>
  );
}

export default App;
