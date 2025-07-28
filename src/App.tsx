import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
// import Joke from "./Joke";
// import TodoList from "./TodoList";


function App() {
  return (
    <Provider store={store} >
      <div className="App">
        {/* <Joke /> */}
        {/* <TodoList /> */}
      </div>
    </Provider>
  );
}

export default App;
