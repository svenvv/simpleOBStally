# simpleOBStally
Simple OBS tally system using a websocket server and the OBS javascript API

Backend is a simple nodejs websocket server. See: https://github.com/websockets/ws combining the https://github.com/websockets/ws#server-broadcast and https://github.com/websockets/ws#how-to-detect-and-close-broken-connections examples.
It does no authentication or filtering of any sorts as of yet. 

URL parameters for the website:
scene : the scene name on which the tally light triggers
role : set this to Director on the director OBS
id : custom ID for filtering purposes

Examples:
OBS web-source: example.com/obstally?role=Director&id=myid

Tally display: example.com/obstally?scene=Camera1&id=myid

