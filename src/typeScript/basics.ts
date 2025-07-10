// console.log("NUmber -- ", 50000000..toLocaleString())
// console.log("NUmber -- ", 50000000..toExponential())
// console.log("NUmber -- ", 9..toString(2))
// console.log("NUmber -- ", typeof Number.NaN)

// ------------- INTERFACES -------------
interface Animal {
  readonly name: string;
  description?: string;
  sound: () => void;
}

// ------------- A class and it is implementing a interface
class Dog implements Animal {
  name: string;
  description?: string;

  constructor(name: string, desc?: string) {
    this.name = name;
    this.description = desc;
  }
  sound() {
    console.log(`${this.name} says 'bow bow' -- ${this.description}`);
  }
}

const jojo = new Dog("MOJO JOJO", "Its' pomerian");
jojo.name = "hlelo busy";
// jojo.sound()

// ------------- A class with private properties and public methods.
class Rectangle {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.height + this.width);
  }
}

const rect = new Rectangle(10, 20);
// rect.width = 0 // compilation error, width is private variable
// console.log("rect area", rect.getArea())
// console.log("rect perimeter", rect.getPerimeter())

// ------------- ENUM -------------
enum testEnum {
  milk = 1,
  butter,
  cheese = 1, // override 1: milk from testEnum
  curd = 10,
  APPLE = "APPLE",
  BANANA = "BANANA",
  ORANGE = "ORANGE",
}
// testEnum.butter = 10 // compilation error, butter is readonly property
let btr: testEnum = testEnum.butter;
// btr = null // gives error at compilation time only

// console.log("here comes in btr - ", btr, testEnum.milk === testEnum.cheese);
// for(let key in testEnum){
// console.log("here comes in key - ", key, testEnum[key])
// testEnum[key] = key
// }
// console.log("here comes in btr - ", testEnum);

enum Weekdays {
  Monday = 1,
  Tuesday = Monday + 1,
  Wednesday = Tuesday + 1,
  Thursday = Wednesday + 1,
  Friday = Thursday + 1,
  Saturday = Friday + 1,
  Sunday = Saturday + 1,
}
// console.log("here comes in Weekdays - ", Weekdays);

// ------------- TUPLES -------------
type tupleType = [number, number, string, string, number];
let tuple: tupleType = [] as unknown as tupleType;
tuple = [1, 2, "hi", "bye", 3];
// tuple[4] = 85678
// tuple.pop()
// console.log('here comes tuple -  ', tuple[4])
// tuple.push(1111)
// console.log('here comes tuple -  ', tuple[4])
// console.log('here comes tuple -  ', typeof tuple, tuple)
// function display(tuple_values: (number|string)[]) {
function display(tuple_values: any[]) {
  for (let i = 0; i < tuple_values.length; i++) {
    console.log(tuple_values[i]);
  }
}

// display(tuple)

// UNKNOWN type
let unknown: unknown;
// console.log(unknown);
// let b: number = unknown; // compilation error "Type 'unknown' is not assignable to type 'number'"
// console.log(b);
let c: any = unknown;
// console.log(c);

// unknown vs any
let valueAny: any = "hello";
valueAny.toUpperCase(); // ✅ Allowed, even if valueAny is not a string

let valueUnknown: unknown = "hello";
// valueUnknown.toUpperCase(); // ❌ Error: Object is of type 'unknown'

// ✅ Safe usage with type narrowing
if (typeof valueUnknown === "string") {
  valueUnknown.toUpperCase(); // ✅ Allowed now
}


//  ---------------------- type alias -------------------------
type numString = number | string

let a: numString = 10
a = "hi"
// a = true // compilation error

// A new type is created
type otherType = "yes" | "no";
let variable: otherType;
variable = "yes"; // no error
// console.log(variable);
// variable = "neither"; // error
// console.log(variable);

//  ---------------------- type assertion -------------------------
type Pet = {
  name: string;
  walk: () => void;
};

type Fish = {
  name: string;
  swim: () => void;
};

let myPet: Pet | Fish = { name: 'Goldie', swim: () => console.log('Swimming') };

// (myPet as Fish).swim();

//  ---------------------- function or method overloading -------------------------
function addData(d1: number, d2: number): number
function addData(d1: string, d2: string): string
function addData(d1: any, d2: any): any{
  return d1 + d2
}
// console.log(addData(1, 3)); // 4
// console.log(addData("hi", " hello")); // "hi hello"
// console.log(addData(true, false)); // compilation error

// method overloading
class Data{
  displayData(data: number): string
  displayData(data: string): string
  displayData(data: any): any{
    return typeof data === 'number' ? data.toString(2) : data
  }
} 
// console.log(new Data().displayData(9)); // "1001"
// console.log(new Data().displayData("hi low")); // "hi low"

//  ---------------------- toPrecision method of Number -------------------------
let myNumber: number = 32.5779; 
// console.log("Number Method: toPrecision()");  
// console.log(myNumber);   // 32.5779
// console.log(myNumber.toPrecision(1));   // 3e+1
// console.log(myNumber.toPrecision(3));  // 32.6

//  ---------------------- How to Extend an Interface from a class in TypeScript ? -------------------------
// Parent class declaration
class Student {
    public id: number;
    public name: string;
    constructor(id:number, name: string){
      this.id = id;
      this.name = name
    }
}

// Creating multiple interfaces which 
// will extend the above class
interface Student_1 extends Student {
    student1_details(): void;
}

interface Student_2 extends Student {
    student2_details(): void;
}

// Creating a class which will extend
// the above interfaces 
class Student_Details extends Student implements Student_1, Student_2 {
    student1_details(): void {
        this.name = "Apple-1";
        this.id = 1;
        console.log(this.id + " - " + this.name);
    }

    student2_details(): void {
        this.name = "Banana";
        this.id = 2;
        console.log(this.id + " - " + this.name);
    }
}

let student_object = new Student_Details(12, 'test');
// student_object.student1_details();
// student_object.student2_details();

// ------------- DECORATORS - EXPERIMENTAL feature --------
function ModifyMessage(sender: string, a: string) {

    return function(target: any, propertyKey: string) {
    
        let modifiedMessage : string;
        
        // Return modifiedMessage whenever the message is asked
        const getter = function() {
            return modifiedMessage;
        };
        
        // Set the modifiedMessage value
        const setter = function() {
            modifiedMessage = `Hello from ${sender} -- ${a}!`;  
        }; 

        // Overwrite the original message with
        // modifiedMessage we just created
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}

class Greeter {
    
     // Modify message property using decorator
    @ModifyMessage("gfg", "hhh")
    firstMessage: string;

    secondMessage: string;
 
    constructor() {
        this.firstMessage = "Hi there!";
        this.secondMessage = "Hi there!";
    }

    greet() {
        console.log(`first message: ${this.firstMessage}`);
        console.log(`second message: ${this.secondMessage}`);
    }
}

let myGreeter = new Greeter();
myGreeter.greet(); 
//  output using "npx ts-node"
// Hello from gfo
// Hi there~
//  output using react webpack
// Hi there~
// Hi there~