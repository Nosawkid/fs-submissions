sequenceDiagram
participant User
participant Browser
participant Server

    User->>Browser: Types a new note and clicks "Save"

    Note right of Browser: Browser captures user input

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Note left of Server: Server receives the new note (JSON object containing content and date)

    Server-->>Browser: HTTP 302 Found (Redirect to /notes)
    deactivate Server

    Note right of Browser: Browser follows the redirect to the /notes page

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: HTML document (updated)
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Note right of Browser: Browser executes JavaScript to fetch updated notes

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: Updated JSON data [{ "content": "New note", "date": "2023-10-24" }, ... ]
    deactivate Server

    Note right of Browser: Browser renders updated list of notes on the page
