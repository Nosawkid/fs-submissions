sequenceDiagram
participant User
participant Browser
participant Server

    User->>Browser: Types a new note and clicks "Save"

    Note right of Browser: The SPA captures user input

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Note left of Server: Server receives the new note (JSON object containing content and date)

    Server-->>Browser: 201 Created (Note successfully added)
    deactivate Server

    Note right of Browser: The browser updates the note list dynamically without reloading the page

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json (optional to fetch updated notes)
    activate Server
    Server-->>Browser: Updated JSON data [{ "content": "New note", "date": "2023-10-24" }, ...]
    deactivate Server

    Note right of Browser: The new note is rendered dynamically in the SPA
