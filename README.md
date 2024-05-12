# Introduction

Welcome to the Electric Vehicle (EV) Charging Simulation Application! This application allows users to simulate the charging behavior and power consumption of electric vehicles at charging stations over the course of one year. Through a set of endpoints, users can run simulations with default input parameters or customize the simulation with specific parameters.



## Prerequisites 
Before running this application, ensure that Docker is installed on your system. You can download and install Docker from the official website.
<br>

## Running the app

To start the application in development mode, execute the following command:

```bash
$ docker compose up
```
Once the application is running, you can access the API documentation UI at:
```bash
$ localhost:3000/api-doc
```
<br>
<br>


## Understanding the app
This application is built using the NestJS framework and its TypeScript starter repository. It consists of three main modules located under the src/ directory:

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
1. POST `/create`: Executes a simulation with provided input parameters, storing the input and output data in separate collections within the database. It then returns both documents connected together for clarity and readability.
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

# Bonus Features:
- Dockerized setup for streamlined development environment.
- Swagger UI implementation for convenient API exploration.
- Modular architecture for enhanced code reusability and maintainability.
