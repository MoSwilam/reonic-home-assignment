# Introduction
This readme file provides a comprehensive guide to understanding,
running, and testing the Electric Vehicle (EV) Charging Simulation application.

# Ready functionality:
- Simulation Logic
- Simulation API

<br>

# Bonus Features:
- Dockerized setup for streamlined development environment.
- Swagger UI implementation for convenient API exploration.
- Modular architecture and linking simulation logic with the API for enhanced code reusability.
- Global request logging

<br>

I could do the FrontEnd task as well but I figured it will take me probably another day or two and I thought not to delay the submission further.

P.S. The task wasn't that complex, but hey, gotta keep things interesting, right? 😜


## Prerequisites 
Before running this app, make sure Docker and Node.JS are both installed on your system.
<br>


## Running the app

To start the app in dev mode, run the following commands:


Install dependencies
```bash
npm install
```
Run the app
```bash
docker compose up
```
Once the application is running, you can access the API documentation UI at:
```bash
localhost:3000/api-doc
```
<br>
<br>


## Understanding the app
This app is built using the NestJS framework and its TypeScript starter repository. It consists of three main modules located under the src/ directory:

**Simulation-logic:** The simulation logic resides in this module, primarily within the simulation-logic.service.ts file. Additionally, a controller file defines an endpoint specifically for running a mock simulation with default parameters.

**Simulation-api:** Serving as the API entry point, this module's controller file defines all CRUD endpoints. The API service interacts with the simulation-logic service, adapting its behavior based on incoming requests with custom parameters. The runSimulation() method is designed to be flexible, allowing for execution with either default or custom parameters.

**Common:** This module contains shared types and an abstract repository utilized by other modules for enhanced code organization and reusability.

<br>
<br>

## Using the app
Once the app is running, navigate to localhost:3000/api-doc to explore the available API endpoints:

### Mock Simulation
1. GET `simulation/mock/run`: Runs the mock simulation using default params

### Simulation API
1. POST `/create`: Executes a simulation with provided input parameters, storing the input and output data in separate collections in the database. It then returns both documents connected together for clarity and readability.
2. GET `/all`: Retrieves all simulation input data entries.
3. GET `/:id`: Retrieves a specific simulation input by ID.
4. PATCH `/:id`: Updates a simulation input in the database.
5. DELETE `/:id`: Deletes a simulation input from the database.

<br>

## Tech Stack 
- NestJS: A web framework for building efficient and scalable Node.js server-side applications.
- MongoDB: A NoSQL document database for storing application data.
- Docker:  A containerization platform for managing application dependencies and deployment.

<br>

## Additional Libraries
- Swagger UI: Provides a user-friendly interface for interacting with and understanding the application's API.

<br>

# Important Note: 
The dev branch has the simulation calculations implemented in native JS, which may occasionally yield inaccuracies when handling decimals of significant precision. after extensive testing, the anticipated concurrency factor, as specified in the task ( 33% - 55% ), falls slightly below expectations, at around 32%.

When I integrated a specialized library for high-precision calculations like Decimal.JS, the concurrency factor results appear to be more optimal. However, it's worth noting that I observed a slightly longer execution time for requests and returning results.

Therefore, I've made both solutions available for testing purposes. You can find the native JS solution in the dev branch, and the implementation using Decimal.JS is available in a separate branch named `feature/use-decimal-js-for-calculations`.


Thanks

Happy review!