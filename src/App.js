import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import { MaxHeap } from "./DSA/tree/maxHeap";
// import { MinHeap } from "./DSA/tree/minHeap";
// import { heapSort } from "./DSA/array/heapSort";
// import { buildBinaryTree } from "./DSA/tree/buildBinaryTree_InOrder_preOrder";
// import * as basics from './typeScript/basics'

const getJoke = async () => {
  try {
    const url = "https://api.chucknorris.io/jokes/random";
    const data = await fetch(url);
    const joke = await data.json();
    console.log("data", joke);
    return joke.value;
  } catch (error) {
  }
};

function App() {
  const [joke, setJoke] = React.useState("");

  React.useEffect(() => {
    // MyPromise.resolve(10).then((x) => {
    //   console.log('x -1 -', x);
    //   return x + 10;
    // }).then(x => {
    //   console.log('x -2 -', x);
    //   return x + 20;
    // }).then(x => {
    //   console.log('x - -', x);
    //   return x + 20;
    // }).catch((x) => {
    //   console.log('catch - x - -', x);
    //   return x + 20;
    // }).finally((x) => {
    //   console.log('finally - x - -', x);
    //   return x + 20;
    // }).then((x) => {
    //   console.log('then - x - -', x);
    //   return x + 20;
    // });
  }, []);

  const handCtaClick = async () => {
    const data = await getJoke();
    setJoke(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {joke}
        <button onClick={handCtaClick}>click me to get a joke</button>
      </header>
    </div>
  );
}

export default App;
