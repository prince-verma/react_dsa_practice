import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import * as test from "./utilities/bitwise/addBinaryStrings";

// const range = {
//   from: 1,
//   to: 5,
//   [Symbol.asyncIterator]: async function* () {
//     try {
//       for (let i = this.from; i <= this.to; i++) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         yield i;
//       }
//     } catch (error) {
//       console.error("Caught an error:", error.message);
//     }
//   },
// };

function App() {
  React.useEffect(() => {
    // console.log(`here comes in sum --  ${stringSum("1", "2")}`);
    // console.log(`here comes in sum --  ${stringSum("98765", "12345")}`);
    // console.log(`here comes in sum --  ${stringSum("16385", "13745")}`);
    // console.log(`here comes in sum --  ${stringSum("18", "12.10")}`);
    // console.log(`here comes in sum --  ${stringSum("12.1", "12.10")}`);
    // console.log(`here comes in sum --  ${stringSum("12.80", "12.10")}`);
    // console.log(`here comes in sum --  ${stringSum("12.911", "12.10")}`);
    // console.log(`here comes in sum --  ${stringSum("12345.123", "29876.123")}`);
    // console.log(`here comes in sum --  ${sum(1)(2)}`);
    // console.log(`here comes in range --  ${JSON.stringify(range)}`);
    // console.log("here comes in -- ", import.meta.url); // script URL
    // (async () => {
    //   for await (const value of range) {
    //     console.log(`here comes in value -- `, value);
    //   }
    // })();
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
