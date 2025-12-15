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