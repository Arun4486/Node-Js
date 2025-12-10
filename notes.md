# Undefined and Not defined :
        when a variable is declared but not initialized yet, and we try to access it, it returns undefined
        but when we try to access and undeclared variable, it gives refference error, bcz ther is no reference regarding this variable inside m/m.

# Fucntions are first class citizens :
        you can do with functions everything that you can do with numbers, strings, or objects.
        Stored in variables
        Passed as an argument to another function
        Returned from another function
        Stored inside arrays or objects

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



