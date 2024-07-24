# JobAds

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

## Prerequisites

Ensure you have the following installed on your system:
- Node.js(v16.14.0)
- npm (comes with Node.js)
- json-server 0.16.3

## Environments

Default configuration is develpment

## Getting Started

1. Clone the repository:

	Command:
	git clone https://github.com/Budalic91/job-ads.git
	
2. Install dependencies:

	Command:
	npm install

3. Run the backend server:

The application uses json-server to simulate a backend server. Ensure you have json-server installed globally:
Command:
npm install -g json-server@0.16.3

Start the server:
Command:
npx json-server --watch db.json

4.Run the Angular application

Command:
npm start
The application should now be running at http://localhost:4200.

## Scripts
The package.json includes several scripts for common tasks:
•	npm start: Runs the Angular application.
•	npm run build: Builds the application for production.
•	npm run watch: Builds the application in watch mode.
•	npm test: Runs the unit tests.
•	npm lint: Lints the project files.


## Important Information

## Angular Material

The application uses Angular Material for the UI components.

## NgRx State Management

NgRx is used for managing the state of the application. The state is divided into multiple slices:
•	jobAds: Manages the state of job advertisements.
•	invoices: Manages the state of invoices

## Running Unit Tests (not completed skip tests)

The application uses Jasmine and Karma for unit testing. To run the tests:
Command:
npm test

## Linting

To lint the project files:
Command:
npm run lint

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

