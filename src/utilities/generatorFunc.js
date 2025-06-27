function* generateSeq(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function* generateAlphaNumeric() {
  yield* generateSeq(48, 55);
  yield* generateSeq(65, 90);
  // yield* generateSeq(91, 120);
}

// console.log([...generateAlphaNumeric()]);

const genObj = generateAlphaNumeric();
let iterator = genObj.next();
let str = "";
while (iterator.done === false) {
  str += String.fromCharCode(iterator.value);
  iterator = genObj.next();
}
// console.log(str);
// console.log(str.length); // '12345ABCDE'
// str.split('').forEach((char, index) => {
//     console.log(`Character at index ${index+1}: ${char} : ${typeof char}`);
// }); // Logs each character with its index

// ---------------------------------------------------------------------------

const testFunc = function* () {
  try {
    const resp = yield "Hello";
    yield `${resp} World`;
    yield 40;
    yield 42;
  } catch (error) {
    console.error("Caught an error:", error.message);
  }
};
const genObj1 = testFunc();
iterator = genObj1.next();
str = "";
while (iterator.done === false) {
  str += iterator.value + " ";
  iterator.value === 40 && genObj1.return("test"); // (2)
  iterator.value === 42 && genObj1.throw(new Error("Test error")); // (2)
  iterator = genObj1.next("test");
}
// str += iterator.value;
// console.log(iterator.value, iterator.done);
// console.log(str);

// ---------------------------------------------------------------------------

function getRandomValue(num) {
  return (num * 16807) % 2147483647;
}
function* pseudoRandom(seed) {
  let value = seed;
  while (true) {
    value = getRandomValue(value);
    yield value;
  }
}


let generator = pseudoRandom(1);

// console.log(generator.next().value); // 16807
// console.log(generator.next().value); // 282475249
// console.log(generator.next().value); // 1622650073


// -----------------------------------------------------------------------------------------


