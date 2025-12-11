# Undefined and Not defined :
        when a variable is declared but not initialized yet, and we try to access it, it returns undefined
        but when we try to access and undeclared variable, it gives refference error, bcz ther is no reference regarding this variable inside m/m.

# Fucntions are first class citizens :
        you can do with functions everything that you can do with numbers, strings, or objects.
        - Stored in variables
        - Passed as an argument to another function
        - Returned from another function
        - Stored inside arrays or objects

# setTimeout() : 
        is a built-in JavaScript function that runs a function once after a specified delay.
        setTimeout(function, delayInMilliseconds);
```js
        setInterval(() => {
        console.log('hi after 2 sec');
        
        }, 2000);
```
# setInterval():
        is a built-in JavaScript function that runs a function repeatedly at a fixed time interval.
        setInterval(callback, delay(ms))
```js
        setInterval(() => {
                console.log("Runs every 2 seconds");
        }, 2000);

```
# Blocking the mian Thread :-
        Blocking the main thread means making JavaScript so busy that the browser/UI can’t respond to user actions (scrolling, clicking, typing, animations).
        What is the “main thread”?
                It’s the single thread that handles:
                JavaScript execution
                UI rendering
        User interactions
        If it’s busy, everything freezes.
        What actually blocks the main thread?
                1. Long-running JavaScript (heavy loops)
                        While this loop runs:
                        page freezes
                        clicks don’t work
                        scrolling stutters
                2. Synchronous APIs -These stop everything until they finish:
                3. Heavy DOM operations
                4. Bad JSON / parsing large data
                5. Infinite loops / recursion
                How to avoid blocking the main thread
                Use async APIs:
                Break heavy work into chunks:

# Web APIs :- 
        browser-provided superpowers for JavaScript
        They are not part of the JS language. They come from the browser (like Chrome, Safari, Firefox).
        Common Web APIs
                1. DOM API - Used to manipulate HTML and CSS.
                                document.getElementById("box").style.color = "red";
                2. Timers API
                        Used for scheduling code.
```js                        
                        setTimeout(() => {
                        console.log("Runs later");
                        }, 1000);

                        setInterval(() => {
                        console.log("Runs repeatedly");
                        }, 1000);
```
                3. Fetch API
                        Used to make network requests.
```js
                        fetch("https://api.example.com/data")
                        .then(res => res.json())
                        .then(data => console.log(data));
```
                4. Storage API
                        Used to store data in the browser.
```js
                        localStorage.setItem("name", "Arun");
                        console.log(localStorage.getItem("name"));
```
                Flow:
                        JS calls a Web API.
                        Browser handles the task in the background.
                        When it finishes, callback goes to the task/microtask queue.
```js
                function checkAsync() {
                setTimeout(() => {
                console.log("async operation");
                }, 3000);

                console.log("sync operation");
                }
                checkAsync() 
```
                first 'sync operation' gets printed then 'async operation' gets printed, it proves that the Async operations like setTimeut() gets executed in a web API outisde the callstack, when it's calculations are done it moves to the callstack and gets executed.


# Event loop :-
        The event loop is the system that decides:
                When and in what order your JavaScript code runs.
        Because JavaScript is single-threaded (it has only one main thread), it can’t run multiple things at the same time.
        The event loop helps it handle async tasks without blocking.
        The Main Parts (very important)
                1. Call Stack - Where normal synchronous code runs.
                2. Web APIs - Browser handles async stuff here (like setTimeout, fetch, DOM events).
                3. Task (Callback) Queue - Where finished tasks from Web APIs wait.
                4. Microtask Queue - For higher-priority tasks like:
                        Promise.then
                        queueMicrotask
                        MutationObserver
                5. Event Loop - Boss that keeps checking:
                        Is Call Stack empty?
                        If yes → push next task from queue.
                Example to really understand
```js
                console.log("Start");
                setTimeout(() => {
                console.log("Timeout");
                }, 0);

                Promise.resolve().then(() => {
                console.log("Promise");
                });

                console.log("End");
```
                Execution order:
                Start → Call Stack
                End → Call Stack
                Promise → Microtask Queue (runs before timeout)
                Timeout → Task Queue

# Lexical chaining :-
                lexical meaning is the literal dictionary meaning of a word,
                Scope chaining is the process where JavaScript looks for a variable in the current scope first, and if it doesn’t find it, it keeps searching in outer (parent) scopes until it reaches the global scope.

# Type of functions :-
        1. Fn statement / Declaration- 
```js
                function(){}
```
        2. Anonymous functions:-
                there is nothing like it in js alone, 
```js
                function (){} it gives syntax error
```
                but when funcitons are used as values they may/may not have names,then it's called anonymous function
        3. Fn Expression -  can be named / anonymous
```js
                var a = function(){}
```
                but this expression is not hoisted, bcz in variable phase the js engine doesn't know the value it's going to be assigned.
        4. Arrow functions :-
                ()=>{}


# Promises :-
        A Promise is an object that represents a value that will be available now, later, or never.
        Promise	- A container for future value
        It is used for handling asynchronous operations like:
                - API calls
                - setTimeout
                - Reading files
                - Database queries
        Three States of a Promise
                1.Pending → operation still running
                2.Fulfilled → operation finished successfully
                3.Rejected → operation failed
                Pending  ────→  Fulfilled  (resolve)
                        └───→  Rejected   (reject)
        Creating a Promise
```js
                let promise = new Promise((resolve, reject) => {
                let success = true;

                if (success) {
                resolve("Task completed!");
                } else {
                reject("Task failed!");
                }
                });

                //How to use a Promise
                //We use .then() and .catch() to get results:
                promise
                .then(result => {
                console.log(result);      // "Task completed!"
                })
                .catch(error => {
                console.log(error);       // if rejected
                });
```
        Example with real async (setTimeout)
```js
                function getData() {
                return new Promise((resolve, reject) => {
                setTimeout(() => {
                resolve("Here is your data!");
                }, 2000);
                });
                }

                getData().then(console.log);
                //Output after 2 seconds:
                //Here is your data!
```
        Why Promises were created?
                Before Promises, we had callback hell:
```js
                doSomething(function(result) {
                doSomethingElse(result, function(newResult) {
                        doThird(newResult, function(final) {
                        console.log(final);
                        });
                });
                });
```
        Promises fix this by making the code flat and readable:
```js
                doSomething()
                .then(doSomethingElse)
                .then(doThird)
                .then(console.log);
                🧪 Promise Chaining
                new Promise((resolve) => {
                resolve(1);
                })
                .then(num => num + 1)  // 2
                .then(num => num + 1)  // 3
                .then(console.log);    // prints 3
```
        async / await (modern way)
        This is just cleaner syntax for using Promises.
```js
                async function test() {
                let result = await getData();  // wait for promise
                console.log(result);
                }

                test();
```
        Ex. //? handling a user cart
```js
                const cart = ["Shoes", "Jackets", "Tracks"];

                const promise = createOrder(cart);
                // Either use the Promise directly, Or wrap it inside a function and then call it
                promise
                .then((orderId) => {
                console.log(orderId);
                return orderId;
                })
                .then((orderId) => {
                return proceedToPayment(orderId);
                })
                .then((paymentInfo) => {
                console.log(paymentInfo);
                })
                .catch((err) => {
                console.log(err.message);
                })
                .then(() => {
                console.log(
                "bcz I'm after the catch block, no matter what happens I will always be called."
                );
                });
                // console.log(orderId); error only accessible through the function

                function createOrder(cart) {
                const pr = new Promise((resolve, reject) => {
                if (!validateCart(cart)) {
                const err = new Error("cart is not valid");
                reject(err);
                }
                const orderId = 1234;
                if (orderId) {
                setTimeout(() => {
                        resolve(orderId);
                }, 2000);
                }
                });
                return pr;
                }

                function proceedToPayment() {
                return new Promise((resolve, reject) => {
                resolve("Payment Successful");
                });
                }
                function validateCart(cart) {
                return true;
                }
```
