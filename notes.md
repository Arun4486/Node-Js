# Node -

    Node js is a runtime env for JS.
    Node doesn't have browser related fucntionalities, like DOM, window obj, alert etc.

# Modules in Node -

    separete files/modules for separate concern

# Node.js core modules -

    Node.js Runtime
        │
        ├── Core Modules (built-in)
        │   ├── fs -     file manager
        │   ├── http -     web server tools
        │   ├── https
        │   ├── path - path utilities
        │   ├── os - information such as CPU details, memory, platform, hostname, or user directories.
        │   ├── crypto -     cryptography tools
        │   └── events
        │
        ├── Your Local Modules
        │   ├── auth.js
        │   ├── db.js
        │   └── utils.js
        │
        └── Third-Party Modules (npm)
            ├── express
            ├── axios
            ├── lodash
            └── mongoose

# FS module -

    Node.js’s way of interacting with the file system.
    used to read, write, create, update, delete, and manage files and directories on your computer.
    methods: write - writeFileSync('./path', 'content')/writeFile('./path', 'content', 'callback')
             read - readFileSync('path', 'encode', (callback))/readFile('./path', 'encode')

# http module -

    used to create web servers and handle HTTP requests and responses.

    Before frameworks like Express existed, developers used the http module directly.
    Every time a client (browser, mobile app, Postman, etc.) sends a request:

    * req contains information about the request.
    * res is used to send a response back.

# http methods -

    1. GET - Used to fetch data.
    2. POST - Used to create new data.
    3. PUT - Used to replace an existing resource.
    4. PATCH - Used to update only specific fields.
    5. DELETE - Used to remove data.

```js
app.get("/users", getUsers);

app.post("/users", createUser);

app.put("/users/:id", updateUser);

app.patch("/users/:id", updatePartialUser);

app.delete("/users/:id", deleteUser);
```
