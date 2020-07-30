# ACME Catalogue

This Web Application provides a movie and TV shows catalogue where authenticated users can rate the content. Logged and unlogged users can look for contents on the catalogue. To do so, they can scroll along the catalogue or use the search box. This search box shows suggestions in real time. You can filter the content by type (Movies or TV Shows) and sort the items alphabetically. When the user clicks on a item in the catalogue, a detailed view will be shown. The detailed view includes a description of the selected movie or TV show, the average rating and the distribution of the users' ratings. Logged users can send or update their rating. Unlogged users will see a message asking them to log in in order to rate the show.

## How to run the project

## Data and authentication server

First of all you need to start the data and authentication server. To do so, move from the root directory to the server folder.

### `cd server`

You might need to install the dependencies

### `npm install`

After installing the dependencies, you can start the server

### `node index.js`

You should see a "ACME server listening on port 4000"

## React App

In another terminal, move to the project root directory and install the necessary dependencies

### `npm install`

Finally, run the app

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing the app

To run the unit and integration tests, run:

### `npm run test`

## Environment variables

You can configure the project by modifying the .env file. In this file you can set 2 properties

 · REACT_APP_SERVER_IP: The IP where the server is running (default: localhost, you can set the IP where the server is running to be accessible for the React app from any device in the LAN)

 · REACT_APP_THEME: The color of the main bar (default: custom, posible values: light (color: light grey), dark (color: black) and custom (color: predefined theme))

## Available users and passwords

| Username      | Password      |
| ------------- |:-------------:|
| luis1997      | luis123       |
| jesus.mendez  | iamjesus      |
| john_smith    | jsmithpass    |