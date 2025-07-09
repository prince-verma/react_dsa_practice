interface User {
  name: string;
  age: number;
  isPremium: boolean;
}

const myNewUser: User = {
  name: "prince",
  age: 18,
  isPremium: false,
};

console.log('here comes in ', myNewUser)

enum demoEnum{
    milk = 1,
    curd,
    butter,
    cheese
}
let btr: demoEnum = demoEnum.butter;

console.log("here comes in btr - ", btr, typeof demoEnum.milk)

