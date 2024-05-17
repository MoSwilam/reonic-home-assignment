# Introduction
This readme file provides a comprehensive guide to understanding,
running, and testing the Electric Vehicle (EV) Charging Simulation application.

# Ready functionality:
- Simulation Logic ( Task 1 )
- Client application ( Task 2a )
- Simulation API ( Task 2b )


<br>

# Bonus Features on the server application:
- Dockerized setup for streamlined development environment.
- Swagger UI implementation for convenient API exploration.
- Modular architecture and linking simulation logic with the API for enhanced code reusability.
- Global request logging

<br>


## Prerequisites 
Before running this app, make sure Docker and Node.JS are both installed on your system.
<br>


## Running the app

To start the app in dev mode, run the following commands:


Install dependencies
```bash
make install
```

Run client and server apps

```bash
make run
```
This command does the following:
- Downloads Mongo image and run it
- Build and run the server app
- Run the client app
each of these runs in a container in a virtual docker network

<br>
Once the application is running, you can access the UI at

```bash
localhost:3000/
```

and you can access API documentation UI at:

```bash
localhost:3010/api-doc
```
<br>
<br>


## Understanding the app
The FrontEnd app is built using React, and the server app is built using the NestJS framework and its TypeScript starter repository. It consists of three main modules located under the src/ directory:

**Simulation-api:** Serving as the API entry point, this module's controller file defines all CRUD endpoints for the simulation inputs, in addition to a service file where the simulation logic resides.
The API service interacts with the simulation-logic service, adapting its behavior based on incoming requests with custom parameters. The runSimulation() method is designed to be flexible, allowing for execution with either default or custom parameters.

**Common:** This module contains shared types and an abstract repository utilized by other modules for enhanced code organization and reusability.

<br>
<br>




### Mock Simulation
1. GET `simulation/mock/run`: Runs the mock simulation using default params

### Simulation API
1. POST `simulation/create`: Executes a simulation with provided input parameters, storing the input and output data in separate collections in the database. It then returns both documents connected together for clarity and readability.
2. GET `simulation/all`: Retrieves all simulation input data entries.
3. GET `simulation/:id`: Retrieves a specific simulation input by ID.
4. PATCH `simulation/:id`: Updates a simulation input in the database.
5. DELETE `simulation/:id`: Deletes a simulation input from the database.

<br>

## Tech Stack 
- NestJS: A web framework for building efficient and scalable Node.js server-side applications.
- MongoDB: A NoSQL document database for storing application data.
- Docker:  A containerization platform for managing application dependencies and deployment.
- React: Framework for building user interfaces

<br>


# Important Note: 
The dev branch has the simulation calculations implemented in native JS, which may occasionally yield inaccuracies when handling decimals of significant precision. after extensive testing, the anticipated concurrency factor, as specified in the task ( 33% - 55% ), falls slightly below expectations, at around 32%.

When I integrated a specialized library for high-precision calculations like Decimal.JS, the concurrency factor results appear to be more optimal. However, it's worth noting that I observed a slightly longer execution time for requests and returning results.

Therefore, I've made both solutions available for testing purposes. You can find the native JS solution in the dev branch, and the implementation using Decimal.JS is available in a separate branch named `feature/use-decimal-js-for-calculations`.



Happy review!