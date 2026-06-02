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

# Express.js -

    is a lightweight web framework for Node.js that helps you build web servers and APIs more easily.
    Express provides convenient methods for:

- Routing
- Handling requests and responses
- Middleware
- Parsing request bodies
- Error handling

# Why express? -
    without express
```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home');
  } else if (req.url === '/users') {
    res.end('Users');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000);
```
    with Express
```js
const app = express()
app.get('/', (req, res) => res.send('Welcome to home page'))
app.get('/Users', (req,res) => res.send('Users page'))
app.listen(3000)
```
    You’ll end up with lots of nested if/else statements.
    Express is built on top of Node’s http module.

# Versioning - 
    for any utility/lib/framework/tool the version is written in 3 parts
    Ex. 4.18.2
    1. Part three - minor fixes (optional to update)
    2. Part two - recommended bug fix ()
    3. Part one - Major release (unstable)

    npm i express@4.18.2 for specific install
    - '^' (compatible version) symbol is to specify/lock a version, if you have ^4.18.2 and update you version, then only recomended fixes get updated and the major release is locked to 4.
    - similarly ~4.18.2, means it can update only the minor fixes and other two parts are locked.