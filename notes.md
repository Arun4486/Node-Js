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
        Before promise we used to depend on callback functions which have two disadvantages 
                1.) Callback Hell (Pyramid of doom) 
                2.) Inversion of control
                1) Inversion of control is overcome by using promise
                        promise is object represent the eventual completion of asynchonous operation
                        a)A promise has 3 states: pending | fulfilled | rejected.
                        b) As soon as promise is fulfilled/rejected => It updates the empty object which is assigned undefined in pending state.
                        c) A promise resolves only once and it is immutable in nature. 
                        d) Using .then() we can attached the cb(callback) function.
                2) - To avoid callback hell (Pyramid of doom) => We use promise chaining. This way our code expands vertically instead of horizontally. Chaining is done using '.then()'
                - A very common mistake that developers do is not returning a value during chaining of promises. Always remember to return a value. This returned value will be used by the next .then()
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
                // Promise Chaining
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

# Callback Hell :-
        Callback Hell happens when you have too many nested callbacks, usually because each async task depends on the previous one.
        This makes the code:
                - Hard to read
                - Hard to debug
                - Hard to maintain
        Example of Callback Hell
```js
                doTask1(data => {
                        doTask2(data, result => {
                                doTask3(result, final => {
                                        doTask4(final, output => {
                                        console.log(output);
                                        });
                                });
                        });
                });
```
        This “pyramid shape” is callback hell.

# Inversion Of Control :-
        You give control of your function to someone else (a third-party function), and you are not in control anymore of when or how it will run.
        This is a problem with callbacks.
        Example:
```js
                function createOrder(cart, callback) {
                        setTimeout(() => {
                                const orderId = "123";
                                callback(orderId);
                        }, 2000);
                }

                createOrder(cart, function(orderId) {
                        console.log(orderId);
                });
```
                Here:
                - You gave your callback to createOrder().
                - You trust that createOrder will:
                - call your callback exactly once
                - call it with correct data
                - not swallow errors
                - not call it multiple times
                - not forget to call it
                - But you have no guarantee.
        You lose control → that’s Inversion of Control.
        Why is Inversion of Control bad?
                - Because someone else decides:
                - When your callback runs
                - What arguments it gets
                - Whether it runs at all
                - Whether it runs twice
                - Whether it throws an error you’ll never see
        This is unsafe.
        Promises solve both problems:
                - Promises avoid Callback Hell
        Instead of deep nesting:
```js
                task1(() => {
                        task2(() => {
                                task3(() => {
                                        task4();
                                });
                        });
                });

                // Promises flatten it:
                task1()
                .then(task2)
                .then(task3)
                .then(task4)
                .catch(handleError);
```
        Promises fix Inversion of Control
                - Because you don’t give your callback to someone else.
        You write:
```js
                createOrder(cart)
                .then(orderId => ...)
```
                And you decide what happens with the result.
                The async function only resolve() or reject() once — guaranteed by JavaScript.
                Your .then() callback is always:
                        - Called exactly once
                        - Called with correct value
                        - Safe from try/catch errors
                        - Scheduled by the JavaScript engine
                This returns control back to you.

# Fetch :-
        fetch() is a built-in JavaScript function used to make HTTP requests (API calls) in the browser.
        It returns a Promise, so it’s asynchronous.
        Basic Syntax
```js
                fetch(url)
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.log(error));
```
        Example – GET Request
```js
                fetch("https://jsonplaceholder.typicode.com/posts/1")
                        .then(res => res.json())
                        .then(data => console.log(data))
                        .catch(err => console.error(err));
                // Output:
                {
                        userId: 1,
                        id: 1,
                        title: "...",
                        body: "..."
                }
```
        Example – POST Request
```js
                fetch("https://jsonplaceholder.typicode.com/posts", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                                title: "New Post",
                                body: "This is my content",
                                userId: 1
                        })
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.error(err));
```
        Key Points About fetch()
                1. Returns a Promise - So you must use .then() or async/await.
                2. Does NOT automatically throw errors - If the server returns 404 or 500, fetch does NOT go to catch.
                        You must manually check: 
```js
                        if (!response.ok) {
                                throw new Error("Request failed!");
                        }
                //Full Example With Error Handling
                async function getUser() {
                        try {
                                const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
                                if (!res.ok) {
                                throw new Error("Network response was not ok");
                        }
                                const data = await res.json();
                                console.log(data);
                        } catch (err) {
                                console.log("Error:", err.message);
                        }
}
                getUser();
```
                Summary: 
                        - fetch() Makes an HTTP request
                        - Returns Promise
                        - .then() Handles success
                        - .catch() Handles errors
                        - .json() Converts response → JS object

# Promise APIs :-
        1. Promise.all() -> 
                Runs multiple promises in parallel and waits for ALL to succeed.
                If any one fails, the whole thing fails.
                as soon as any promise fails it fives failure for all.
                Example:
```js
                        const p1 = Promise.resolve(10);
                        const p2 = Promise.resolve(20);
                        const p3 = Promise.resolve(30);

                        Promise.all([p1, p2, p3])
                        .then(values => console.log(values))   // [10, 20, 30]
                        .catch(err => console.log("Error:", err));
                        // Failure example:
                        const p1 = Promise.resolve(10);
                        const p2 = Promise.reject("Failed!");

                        Promise.all([p1, p2])
                        .then(console.log)
                        .catch(console.log);     // "Failed!"
```
                        Best for:
                                - Dashboard data
                                - Loading product details + reviews together
                                - Sending multiple independent API calls
                                - Fails fast:
                                - If even one promise rejects → entire Promise.all fails.

        2. Promise.allSettled()
                Waits for all promises, even if some fail.
                Always returns an array of results with status and value/reason.
                Example:
```js
                        const p1 = Promise.resolve(10);
                        const p2 = Promise.reject("Error");
                        const p3 = Promise.resolve(30);
                        Promise.allSettled([p1, p2, p3])
                                .then(results => console.log(results));
                        //Output:
                        [
                        { status: "fulfilled", value: 10 },
                        { status: "rejected", reason: "Error" },
                        { status: "fulfilled", value: 30 }
                        ]
```
                - No error
                - You get complete report of all promises

                Best for:
                        - Displaying partial results
                        - Running analytics jobs
                        - Uploading multiple files (some may fail)

        3. Promise.race()
                Returns the first promise to finish (success OR failure).
                Whichever finishes first wins the race.
                Example:
```js
                        const slow = new Promise(res => setTimeout(() => res("Slow"), 2000));
                        const fast = new Promise(res => setTimeout(() => res("Fast"), 500));

                        Promise.race([slow, fast])
                                .then(result => console.log(result));  // "Fast"
                // Failure example:
                        const p1 = new Promise((_, rej) => setTimeout(() => rej("Fail"), 100));
                        const p2 = new Promise(res => setTimeout(() => res("Success"), 500));

                        Promise.race([p1, p2])
                                .catch(console.log);  // "Fail"
```
                Best for:
                        - Setting API timeouts
                        - Competing services (use whichever returns first)
                        - UI interactions (first event wins)
                        - If a fast promise rejects → whole race rejects immediately.
        4. Promise.any()
                - Returns the first successful promise.
                - Ignores failures.
                - Errors only if ALL fail.
                Example:
```js
                        const p1 = Promise.reject("Err 1");
                        const p2 = Promise.reject("Err 2");
                        const p3 = Promise.resolve("Success!");

                        Promise.any([p1, p2, p3])
                        .then(console.log)      // "Success!"
                        .catch(console.log);
                        // Failure example:
                        const p1 = Promise.reject("A failed");
                        const p2 = Promise.reject("B failed");
                        const p3 = Promise.reject("C failed");

                        Promise.any([p1, p2, p3])
                                .then(result => console.log(result))
                                .catch(err => {
                                        console.log("All failed");
                                        console.log(err.errors);   // <– array of all rejections
                                });
                        //["A failed", "B failed", "C failed"]

```
                Best for:
                        - Backup APIs
                        - Retries from multiple servers
                        - Network fallback strategies
                        - First fast success regardless of slow failures
        Quick Comparison Table
        API	                Success?	        Failure?	                When returned?
        ---                     --------                --------                        --------------
        Promise.all	        After all succeed	If any fail	                Waits for all
        Promise.allSettled	Always	                Never fails	                After all finish
        Promise.race	        First finished promise	If first finishes with error	First settled
        Promise.any	        First success	        Only if all fail	        First successful

        Easiest one-liners
                all → "all must win"
                allSettled → "everyone gets a report card"
                race → "first to finish wins"
                any → "first success wins"