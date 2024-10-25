Player Statistics API
This project is a web application developed in Node.js and Express to calculate and return player statistics from completed games via an API.

Table of Contents
Environment Setup
How to Build
How to Run
Running Tests
API Endpoints
Technologies Used
Environment Setup
Prerequisites
Ensure you have the following installed on your machine:

Node.js
Git
Cloning the Repository
Clone the repository from GitHub:

git clone https://github.com/milan-vasovic/basketball-tournament.git
Navigate to the project directory:

cd basketball-tournament
Installing Dependencies
To install the required Node modules, run the following command:

npm install
This will install all dependencies as defined in the package.json file.

How to Build
This project does not require a build step, as it runs directly using Node.js.

How to Run
To start the application, use the following command:

npm start
By default, the server will start on http://localhost:3000.

Running the Development Server
To run the server in development mode with automatic restarts on file changes, use:
npm start

Running Tests
To run the test suite, execute:
npm test
This command will run all test cases defined in the test folder, providing feedback on the application's functionality.

API Endpoints
The main endpoint to fetch player statistics is:

GET /stats/player/:playerFullName
Description: Returns the calculated statistics for a specified player.

Parameters:
playerFullName (String) - The full name of the player whose statistics are requested.

Technologies Used
Node.js - JavaScript runtime environment for server-side development.
Express.js - Web framework for Node.js, handling routing and middleware.
Mocha - JavaScript testing framework.
Chai - Assertion library for Node.js used with Mocha.
CSV-Parser - A module to read and parse CSV files.
