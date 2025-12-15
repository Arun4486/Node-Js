# Plasmo:-
    React framework for browser extensions
# Extension Entry Points (Very Important):-
    File / Folder	        Purpose
    popup.tsx / popup.jsx	UI when you click extension icon
    background.ts	        Service worker (runs in background)
    content.ts	            Runs inside web pages
    options.tsx	            Extension settings page
    newtab.tsx	            Custom new tab page
    These are called extension entry points

# Content Script:-
    A script that runs inside a website’s DOM, not inside your extension UI.
    Use cases
        - Read page content
        - Inject buttons
        - Modify DOM
        - Scrape data (legally)

    Plasmo:
        - Injects script into matching pages
        - Bundles it separately
        - Handles isolation automatically
# plasmo.config.ts (Extension Brain):-
    This replaces manual manifest.json.
    manifest → Chrome extension manifest
    permissions → Chrome APIs access
    host_permissions → Website access
# Background Script (Service Worker):-
    - Runs even when popup is closed
    - Handles long-running tasks
    - Listens to browser events
    Service Worker (Manifest V3)
    Event-driven (not always running)

# Messaging (Content ↔ Background ↔ Popup):-
    needed -> Because these contexts are isolated.
```js
        Basic pattern
        // content.ts
        chrome.runtime.sendMessage({ type: "HELLO" })

        // background.ts
        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.type === "HELLO") {
                console.log("Received")
            }
        })
```

# UI Styling (Tailwind in Plasmo):-
    Plasmo supports:
        - CSS modules
        - Tailwind
        - Inline styles
    Important concept
        - Content scripts do not share CSS with popup.
        - Each context has:
        - Its own CSS bundle
        - Its own React root
    Term	            Meaning
    Entry point      ->	File that becomes a manifest feature
    Content script   ->	Script injected into websites
    Isolated world   ->	Content script JS sandbox
    Service worker   ->	Background script
    Host permissions ->	Website access
    Shadow DOM       ->	Used by Plasmo for UI injection
    HMR              ->	Hot Module Reload (dev mode)

# Service Worker (Background in MV3) :-
    A service worker is the brain of the extension.
    It runs in the background, without UI, and wakes up only when an event happens.
    What it is NOT
        - Not always running
        - Not a webpage
        - No DOM
        - No window, document
    Mental Model
        Extension installed
            ↓
        Service worker sleeps 😴
            ↓
        Event happens (click, message, alarm)
            ↓
        Service worker wakes up 🧠
            ↓
        Handles event
            ↓
        Dies again 😴
    Why MV3 forced this
        - Security
        - Battery savings
        - Prevent tracking
    Important Terms
    Term	        Meaning
    Event-driven	Runs only on events
    Ephemeral	    Memory is not persistent
    Cold start	    Worker starts from scratch
    Stateless	    Don’t rely on globals
    What service workers are USED for:
        - Message routing (deciding where a message should go and who should handle it. In browser extensions, multiple isolated parts exist, so messages don’t magically know their destination.)
        - API calls
        - Storage access
        - Tab management
        - Extension lifecycle events

# Communication (Messaging System):-
    Extensions are split into worlds, so direct access is impossible.
    Communication happens via events.
    Messaging is not communication — it is coordination between isolated systems.
    1. Event Broadcast:
        Sending a message without knowing who listens.
        - Content → broadcast
        - Popup → broadcast
        Characteristics
            - One-to-many
            - Fire-and-forget
            - No guaranteed response
    2. Event Listening:
        Waiting for messages and reacting.
        - Background listens
        - Content listens
        - Popup listens
    Key Terms
    Term	    Meaning
    Message	    Serialized data
    Channel	    Communication path
    Listener	Function waiting for events
    Sender	    Who fired the event
    Response	Optional reply
    
    Important Rule:
        1. Messages must be serializable
        2. No context can directly access another context’s variables, functions, or DOM.(separate world)
        3. Only JSON-serializable data can be sent.(string, number, boolean, object, arrays)
        4. Every message is async. No immediate return value. (send → wait → receive)
        5. Cross-context communication should go through the service worker.
        6. Message describes WHAT, not HOW.



