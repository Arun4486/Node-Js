# How JS runs Asyncronously :-
        1)Thread = an execution lane inside a CPU process. A thread runs instructions sequentially (one at a time).
        A program/process can have one thread (single-threaded) or many threads (multi-threaded). Each thread has its own call stack and executes code independently (but shares memory with other threads in the same process).
        JS engines (V8, SpiderMonkey, JavaScriptCore) run JavaScript on a single main thread by default. That means JS executes one step at a time on that single call stack.
        2) So how can JS do asynchronous work if it’s single-threaded?
                Important point: “asynchronous” ≠ “multithreaded JS code”.
                The browser (or Node.js) provides other threads outside the JS engine — for things like network requests, timers, rendering, file I/O. JavaScript offloads tasks to those subsystems and gets notified later. The JS engine still executes the callback later on the single JS thread.
                Here’s the pipeline, step by step:
                - JS (call stack) asks Browser APIs to do work
                - Example: fetch(url), setTimeout(fn, 1000), DOM events, XMLHttpRequest, reading files, etc.
                        - These are not pure-JS; they are provided by the environment (browser or Node).
                        - When you call them, the call returns quickly (often a Promise or registration), and the heavy work is handed off.
                        - Browser / OS handles the heavy work on other threads
                        - Network I/O, timers, file system, GPU rendering → handled by threads or the OS kernel.
                        - These subsystems run in parallel (outside JS), so they don’t block the JS call stack.
                        - When the work finishes, the result is queued for JS
                        - The environment puts a message (a callback) into a queue: either the microtask queue (promises) or the task/callback queue (setTimeout, events).
                        - It does not immediately run the callback. The callback waits until the JS call stack is empty.
                        - The Event Loop moves tasks to the call stack
                        - The event loop repeatedly: if the call stack is empty, it picks microtasks and runs them all, then picks one task from the task queue and runs it.
                        - That picked callback runs synchronously on the JS call stack (remember: still single-threaded).
                        - So JS achieves concurrency by cooperating with other threads and queues — offloading work and resuming when results are ready. JS itself remains single-threaded; it just schedules work.
        3) Short code example and what actually runs where
                console.log("A");                // runs on JS thread
                setTimeout(() => console.log("B"), 0); // timer handled by browser timers thread
                Promise.resolve().then(() => console.log("C")); // microtask queued
                console.log("D");                // runs on JS thread
                What happens:
                - A prints.
                - setTimeout registers a timer with the browser (offloaded).
                - Promise.resolve().then(...) schedules a microtask.
                - D prints. 
                - Call stack is empty → microtasks run: C prints.
                - Tasks (timer) run next tick → B prints.
                Final output:
                A
                D
                C
                B
        4) Where does the “real work” happen (network, timers, file I/O)?
                - Networking: sockets and HTTP processing are done by the browser’s network threads / OS. The browser then notifies JS when data is ready.
                - Timers: the timer is tracked by the browser (or libuv in Node) and when it fires the callback is queued.
                - Rendering: layout/paint often runs on different threads (compositor, GPU).
                - File I/O (Node): handled by background worker threads (libuv) or the OS.
                - JS only processes the callback that the environment posts once the background thread or OS signals completion.
        5) Web Workers (and Node worker threads) — real JS threads
                If you need to run JS code truly concurrently, you can use:
                Web Workers (browser) or Worker Threads (Node).
                Each worker runs its own JS engine instance on a separate OS thread with its own event loop and call stack. Communication happens via message passing (postMessage), not shared memory by default. This is how you can do CPU-heavy work without blocking the main thread.
        6) Now map this to your 2D/3D/4th-dimension analogy
                The 2D plane with points = your single JS thread (your program’s main execution). Each point is a synchronous instruction or function on the call stack.
                The object at (x,y,z) = a heavy job that the 2D point cannot do directly (because it only exists on the plane).
                What you do: the point (JS) delegates the fetch to an external courier (Browser Web API / OS thread). You hand the courier the coordinates (the request).
                The courier goes into the 3D world (other threads/OS) and physically fetches the object (performs network I/O, timer, disk read). You — the point on the plane — do not block waiting; you keep doing other things on the plane.
                When the courier returns, they drop a note in a mailbox on the plane (the callback queue).
                The plane’s event loop (a clerk) checks the mailbox only when the point is not busy (i.e., call stack empty). Then the clerk brings the note to the point, and the point executes the callback and consumes the object.
                About the z-dimension / 4th dimension confusion: you (the 2D point) need not understand the courier’s space. You just know: “I asked; someone else will handle it; I’ll get a notification later.” The courier knows how to handle z or 4D because it’s a different system with different capabilities (network stack, kernel calls). JS’s model hides those details and gives you a simple contract: register a callback or await a promise — you’ll be notified later.
                So: JS outsources the hard, multi-dimensional work, and re-integrates the result later on the same plane in a predictable order.
        7) A slightly deeper bit: why Promises (microtasks) run before timers
                Browsers give microtasks (promises) higher priority because they are considered continuations of the current job. So after the call stack empties, the event loop runs all microtasks first (so .then() runs immediately after the synchronous code finishes). Only then does it run tasks from the task queue (timers, events). That’s why promise callbacks appear before setTimeout(..., 0) callbacks.
        8) Key takeaways (short)
                - JavaScript engine uses a single call stack (single thread for JS code).
                - Async work is implemented by offloading tasks to other threads or the OS (network, timers, file I/O, rendering).
                - When offloaded work completes, the environment queues a callback for JS. The event loop schedules that callback back onto the single JS thread.
                - You can get real JS concurrency with Web Workers (separate JS threads), but communication is message-based.

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
        Promise	- A container for future value, first it gets settled, once settled, it can either resolve or reject.
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
        - fetch() is a built-in JavaScript function used to make HTTP requests (API calls) in the browser.
        - fetch() always returns a Promise that resolves to a Response object.
        - This prints a Promise, NOT the data.
        - When it resolves, you get a Response object:
```js
                fetch("https://api.example.com/data")
                .then(response => {
                console.log(response); // Response object
                });
```
        The Response object contains:
                - status
                - ok
                - headers
                - url
                - body (a readable stream)
                - methods like .json(), .text(), .blob(), etc.
        response.json() also returns a Promise.
        When resolved, it gives you the parsed JSON data.
        Example:
```js
        fetch(url)
        .then(res => res.json())
        .then(data => {
        console.log(data); // Actual JSON data (object/array)
        });
```
        Important:
                - response.json() does not give you the JSON immediately.
                - It reads the body asynchronously because the HTTP stream is not instant.
        Why both return Promises?
        - fetch() returns a Promise -> Because the network request takes time.
        - response.json() returns a Promise -> Because reading and parsing the body also takes time.
        Basic Syntax:
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

# Async Await :- 
        async:
                When you put async before a function, "it always returns a Promise", no matter what you return inside it. If a promise is returned then it returns it as it is, if normal value is return then it wraps it inside a promise.
                Example:
```js
                async function hello() {
                        return "Hello"; // but this becomes: Promise.resolve("Hello")
                }

                hello().then(console.log); // Hello
```
        await:
                await pauses the function until the Promise settles (fulfilled or rejected).
                It can only be used inside async functions (or top-level in modules).
                Example:
```js
                async function getData() {
                        let data = await fetch("/api/data");
                        data = await data.json();
                        console.log(data);
                }
```
        Async/Await are used to handle promises
        This avoids chaining .then().
        The normal logs inmside an async function outputs instantly, but if there is anything after await statement then it comes after the promise is resolved.
        The output of more then two prmoises in async function comes sequencially iun order of the await statements, if first takes more time then 2nd then both comes together after the 1st timer finishes. but of the first promise's timer finishes first then it gets returned and then the second one.
        How async/await works in the event loop
                - await pauses only the async function, not the entire program.
                - The paused part is moved to the microtask queue.
                - So other JS code continues running.
        Example: async/await vs promises
        Using Promises:
```js
                fetchUser()
                        .then(user => fetchOrders(user))
                        .then(orders => console.log(orders))
                        .catch(err => console.error(err));
```
        Using async/await:
```js
                async function showOrders() {
                        try {
                                const user = await fetchUser();
                                const orders = await fetchOrders(user);
                                console.log(orders);
                        } catch (e) {
                                console.error(e);
                        }
                }
```
        - Cleaner, easier to read.
        - Error handling with async/await
        Use try.. catch:
```js
                async function test() {
                        try {
                                const data = await fetch("wrong-url");
                        } catch (error) {
                                console.log("Error occurred:", error);
                        }
                }
```
        If you forget try...catch, the async function returns a rejected promise.
        Awaiting non-promises
        If you do:
                await 5;
                It becomes Promise.resolve(5) automatically.
                JS converts non-promises to promises.
        - async ->      Declares a function that returns a Promise
        - await ->	Pauses execution until a Promise resolves
        - try/catch ->	Used with async/await for errors
        - Promise.all ->Runs things in parallel with await

# This keyword:-
        this is NOT a variable.
        It is a context — decided based on how a function is called (not where it is written).
        1. Global Scope
                In Browser:
                        console.log(this); 
                        Output: window
                        So in global scope → this = window
                In Node.js:
                        this = {} (module.exports)
        2. Inside a Regular Function
```js
                function test() {
                        console.log(this);
                }
                test();
```
                In non–strict mode: -> this = window
                In strict mode: -> this = undefined
                Because strict mode removes “auto-binding" of this.
                Auto Binding --> JavaScript automatically assigns a value to this depending on how a function is called.
                        You don’t manually set this — JS does it for you.
                        This "automatic binding" happens mostly with regular functions, not arrow functions.
                Where does auto-binding happen?
                        1. Global functions
```js
                                function test() {
                                        console.log(this);
                                }
                                test();
```
                                In non-strict mode →
                                - this automatically becomes window
                                In strict mode →
                                - this automatically becomes undefined
                        2. Object methods
```js
                                const obj = {
                                        name: "Arun",
                                        show() {
                                                console.log(this);
                                        }
                                };
                                obj.show(); 
```
                                Auto-binding sets this = obj
                                Because the function is called through an object.
                        3. Event listeners
```js
                                button.addEventListener("click", function () {
                                        console.log(this);
                                });
```
                                Auto-binding sets this = the DOM element.
                When auto-binding does NOT happen
                        1. Arrow functions
```js
                                const obj = {
                                        fn: () => {
                                                console.log(this);
                                        }
                                };
                                obj.fn();
```
                                this is NOT bound automatically.
                                Arrow functions skip auto-binding and inherit this from the parent scope.
        3. Inside a Method (Function inside an object)
```js
                const user = {
                        name: "Arun",
                        getName() {
                        console.log(this);
                        }
                };
                user.getName();
```
                this = user object
                Because the function is called through the object.
                But careful: assigning method to variable changes this
        4. Inside a Constructor Function
```js
                function Person(name) {
                        this.name = name;
                }
                const p = new Person("Arun");
                // this = the new object being created
```
        5. Inside a Class
                Under the hood classes use constructor functions.
```js
                class Car {
                        constructor(model) {
                        this.model = model;
                        }
                }
```
                this = the instance of the class
        6. Arrow Functions – VERY IMPORTANT
                Arrow functions do NOT have their own this.
                They take this from their outer (lexical) scope.
```js
                const obj = {
                        name: "Arun",
                        fn: () => {
                                console.log(this);
                        }
                };
                obj.fn();
```
                Output: window, NOT obj.
                Why?
                Because arrow functions do not bind this → they use the parent scope’s this.
                When arrow functions should not be used:
                - In object methods
                - In event listeners (sometimes)
                - In constructors (they can’t be used)
        7. Inside Event Listeners
```js
                button.addEventListener("click", function() {
                        console.log(this);
                });
```
                this = the DOM element that received the event.
                But with an arrow function:
```js
                button.addEventListener("click", () => {
                console.log(this);
                });
```
                [object Window] is returned
                this is NOT the button
                this comes from the outer scope (usually window)
        8. Using call(), apply(), bind()
                call() → call function and set this
```js
                function greet() {
                console.log(this.name);
                }
```
                greet.call({ name: "Arun" }); // Arun , here we can access a function inside an obj and use it for any other value or for another object
```js
                        const student = {
                                name: "Arun",
                                sayMyName: function (hometown, state) {
                                        console.log(this.name, hometown, state);
                                },
                        };
                        // student.sayMyName(); // Arun
                        const student2 = {
                                name: "Katiyar",
                        };
                        student.sayMyName.call(student2, " Sitapur", " UP"); //Katiyar, it's called function borrowing
```
                apply() → same as call but takes array
```js
                        const sayMyName = function (hometown, state) {
                                console.log(this.name, hometown, state);
                        };
                        const student = {
                                name: "Arun",
                        };
                        const student2 = {
                                name: "Katiyar",
                        };      
                        sayMyName.apply(student, [" Sitapur", " UP"]); //Arun Sitapur UP
```
                bind() → returns a new function with fixed this
```js
                        const sayMyName = function (hometown, state) {
                                console.log(this.name, hometown, state);
                        };
                        const student = {
                                name: "Arun",
                        };

                        const student2 = {
                                name: "Katiyar",
                        };
                        const printDetails = sayMyName.bind(student, [" Sitapur", " UP"]);
                        printDetails(); //Arun [ ' Sitapur', ' UP' ] undefined
```
        Master Table of this Behavior
        Context	Value of this
        - Global scope --> window
        - Function (normal) -->	window / undefined (strict mode)
        - Method of object -->	object itself
        - Constructor --> new instance
        - Class --> new instance
        - Arrow function -->	from parent scope (lexical)
        - Event listener (normal function) -->	element
        - Event listener (arrow) -->	lexical this
        - call/apply/bind -->	explicitly set by you

# Git:-
        A social network + storage + collaboration tool for developers.
        You use Git on your computer, and GitHub is where you host your repositories.
        What GitHub Provides
                -  Remote storage for your code --> Instead of keeping your Git repo only on your computer, GitHub stores it online.
                - Version history (using Git) --> Every commit you make is saved and viewable.
                - Collaboration --> You and your teammates can work on the same project without overwriting each other.
                - Open-source contributions --> Millions of projects are open-source on GitHub
                - You can view, fork, clone, contribute.
        Git vs GitHub:
        Git	                                GitHub
        ---                                     ------
        A tool installed on your computer	A website that hosts Git repositories
        Manages versions locally	        Stores them in the cloud
        Works offline	                        Requires internet
        Command-line tool	                Web UI + tools for collaboration
        Key GitHub Terms
        1.Repository --> Project folder stored online.
        2.Clone --> Download a GitHub repo to your computer
        3.Push & Pull --> push → send local commits to GitHub
                                pull → get updates from GitHub
        4.Branches --> Separate development lines.
        5.Pull Requests (PRs) --> A request to merge changes from one branch to another.
        6.Issues --> Bug reports, tasks, improvements… like a task manager.
        7.Fork --> Copy someone else’s repo to your GitHub to modify it.