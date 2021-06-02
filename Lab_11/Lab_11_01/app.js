// const child_process = require("child_process");

// console.log("1: start");
// const new_process = child_process.spawn("node",["./computation/fibonacci.js"],{stdio: "inherit"});
// console.log("2: End");
      

const fib = require("./computation/fibonacci");
console.log("1: start");
const promise = fib.promiseFib(45);
promise.then(console.log).catch(console.log);
console.log("2: End");