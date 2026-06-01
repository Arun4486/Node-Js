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
            