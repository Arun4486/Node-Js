//? Undefined and not defined
// console.log(a)
// var a = 10;
// console.log(a);

//? Asyncronous Operations in js
// setTimeout(() => {
//   console.log("hi after 2 sec");
// }, 1000);

// function checkAsync() {
//   setTimeout(() => {
//     console.log("async operation");
//   }, 3000);

//   console.log("sync operation");
// }
// checkAsync()
//! first 'sync operation' gets printed then 'async operation' gets printed, it proves that the Async operations like setTimeut() gets executed in a web API outisde the callstack, when it's calculations are done it moves to the callstack and gets executed.
// console.log("sync operation");
// function sayHi(y) {
//   console.log("Say hi!");
//   y();
// }
// sayHi(function y() {
//   console.log("hi");
// });

// let count = 0;
// document.getElementById("clickMe").addEventListener('click', function handleClick(){
//     console.log('button clicked', ++count);

// });

//? Logical Problem on setTimeout()
// function printNums() {
//   for (let i = 1; i <= 6; i++) { //! when using var it consoles 6 six times, bcz var is global scope, and with let every time it's called a new copy of i get the data
//     setTimeout(() => {
//       console.log(i);
//     }, i * 1000);
//   }
// }
// printNums()

// function printNums() {
//   for (var i = 1; i <= 6; i++) {
//     function close(x) {
//       setTimeout(() => {
//         console.log(x);
//       }, i * 1000);
//     }
//     close(i)
//   }
// }
// printNums();

//? Promises
// const promise = new Promise((resolve, reject) => {
//   let success = false;
//   if (success) {
//     resolve("task completed"); // this content inside resolve / reject get passed to the promise and then to the handlers(.then/.catch).
//   } else {
//     reject("task failed");
//   }
// });
// promise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//? handling a user cart with the help of promises
// const cart = ["Shoes", "Jackets", "Tracks"];

// const promise = createOrder(cart); // Capturing a promise

// promise
//   .then((orderId) => {
//     console.log(orderId);
//     return orderId;
//   })
//   .then((orderId) => {
//     return proceedToPayment(orderId);
//   })
//   .then((paymentInfo) => {
//     console.log(paymentInfo);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   })
//   .then(() => {
//     console.log(
//       "bcz I'm after the catch block, no matter what happens I will always be called."
//     );
//   });
// console.log(orderId); //! error, orderId only accessible through the function createOrder()

// function createOrder(cart) {
//   const pr = new Promise((resolve, reject) => {
//     if (!validateCart(cart)) {
//       const err = new Error("cart is not valid");
//       reject(err);
//     }
//     const orderId = 1234;
//     if (orderId) {
//       setTimeout(() => {
//         resolve(orderId);
//       }, 2000);
//     }
//   });
//   return pr;
// }

// function proceedToPayment() {
//   return new Promise((resolve, reject) => {
//     resolve("Payment Successful");
//   });
// }
// function validateCart(cart) {
//   return true;
// }

// const ytApi = "http://www.facebook.com";
// const user = fetch(ytApi).then((res) => console.log(res.json()));

// console.log("user", user);
// console.log("res:", res);

// async function getData() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/todos/1"); // dummy API
//   const res = await data.json();
//   console.log(res);
//   console.log(res.userId);
// }
// getData();

//? example for Promise APIs
// const p1 = new Promise((resolve, reject) => {
//   // setTimeout(() => resolve("p1 success"), 3000);
//   setTimeout(() => {
//     reject("p1 fails");
//   }, 3000);
// });
// const p2 = new Promise((resolve, reject) => {
//   //? for success
//   // setTimeout(() => resolve("p2 succes"), 2000);
//   //? for failure
//   setTimeout(() => reject("p2 fails"), 2000);
// });
// const p3 = new Promise((resolve, reject) => {
//   // setTimeout(() => resolve("p3 success"), 1000);
//   setTimeout(() => reject("p3 fails"), 1000);
// });

//? Promise.all()
// Promise.all([p1, p2, p3])
//   .then((res) => {
//     // console.log(res); //["p1 success", "p2 success", "p3 success"] ,res after 3 for all success
//   })
//   .catch((err) => console.log(err)); // p2 fails, res after 2 sec

//? Promise.allSettle()
// Promise.allSettled([p1, p2, p3])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err)); // after 3 sec, [{status: "fulfilled", value: "p1 success"}, {status: "rejected", reason: "p2 fails"}, {status: "fulfilled", value: "p3 success"}]

//? Promise.race()
// Promise.race([p1, p2, p3])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err)); // p3 success, res in 1 sec

//? Promise.any()
// Promise.any([p1, p2, p3])
//   .then((res) => console.log(res)) // p3 success, earliest
//   .catch((err) => console.log(err.errors)); // Aggrigate error ,["p1 fails", "p2 fails", "p3 fails"] , after longest of time.

//? Async Await in JS

// async function getData() {
//   return "hahahah";
// }
// const data = getData();
// console.log(data); // Promise {result: "hahahah", status: "fulfilled"}

// const p = new Promise((resolve, reject) => {
//   resolve("I'm a Promise");
// });

// async function getData() {
//   return p;
// }
// const dataPromise = getData();
// dataPromise.then((res) => console.log(res)); // I'm a Promise

//? handling promise with async / await
// const p = new Promise((resolve, reject) => {
//   resolve("My name is Arun Katiyar");
// });
// async function callName() {
//   const name = await p;
//   console.log(name);
// }
// callName();

// //? getting data from an API
// const webAPI = "https://jsonplaceholder.typicode.com/todos/1";
// async function getWebApi() {
//   try {
//     const res = await fetch(webAPI);
//     const data = await res.json();
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// }
// getWebApi();

//? difference between older way of using Promises, and promises with Async / Await

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("promise result after 5 sec");
//   }, 5000);
// });

// function getdata() {
//   promise.then((res) => console.log(res));
//   console.log("sync output");
//   getdata(); // sync output instantly, then promise after 5 sec
// }

// async function getData() {
//   console.log("Normal output before await"); // outputs instantly
//   const promiseData = await promise;
//   console.log("Normal log inside Async funciton after await");
//   console.log("Promise data", promiseData);

//   const p2Data = await promise;
//   console.log("second await output "); // outputs parallaly with 1st  await
// }
// getData(); // JS engine waits for 5 sec then everything that is after await promise outputs together
// console.log("sync ouput"); // ooutputs instantly

//? async outputs for two promises

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise 1");
//   }, 10000);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise 2");
//   }, 5000);
// });

// async function getPromises() {
//   console.log("Normal output before await"); // outputs instantly
//   const promise2 = await p2;
//   console.log("p2 5 sec ", promise2);
//   const promise1 = await p1;
//   console.log("p1 10 sec", promise1);
// }
// getPromises(); // output comes sequencially in order of the await statements.
// console.log("sync ouput");

//? This keyword
// console.log(this); // global obj in node env, window obj in brwser

//? inside constructor function
// const user = {
//   sayHi(name) {
//     this.name = name;
//     console.log(` Hi! ${name}`);
//   },
// };
// user.sayHi("Arun");

//? inside Method (function inside obj)

// const user = {
//   sayHi() {
//     console.log(this);
//   },
// };
// const a = user.sayHi;
// a(); // global obj

//? .call()
// const student = {
//   name: "Arun",
//   sayMyName: function (hometown, state) {
//     console.log(this.name, hometown, state);
//   },
// };
// // student.sayMyName(); // Arun

// const student2 = {
//   name: "Katiyar",
// };
// student.sayMyName.call(student2, " Sitapur", " UP"); //Katiyar, Sitapur, UP

//? Apply()

// const sayMyName = function (hometown, state) {
//   console.log(this.name, hometown, state);
// };
// const student = {
//   name: "Arun",
// };
// // student.sayMyName(); // Arun

// const student2 = {
//   name: "Katiyar",
// };
// sayMyName.apply(student, [" Sitapur", " UP"]); //Arun Sitapur UP

//? bind()

// const sayMyName = function (hometown, state) {
//   console.log(this.name, hometown, state);
// };
// const student = {
//   name: "Arun",
// };

// const student2 = {
//   name: "Katiyar",
// };
// const printDetails = sayMyName.bind(student, [" Sitapur", " UP"]);
// printDetails(); //Arun [ ' Sitapur', ' UP' ] undefined

//? this for DOM

const btn = document.getElementById("clickMe");
// btn.addEventListener("click", function handleClick() {
//   alert(this); //[object HTMLButtonElement]
// });

btn.addEventListener("click", () => {
  alert(this); //[object Window]
});

