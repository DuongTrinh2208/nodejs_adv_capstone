# Project Setup Guide

This guide will walk you through the steps to set up the necessary Docker containers, initialize the PostgreSQL database, and run the project services. 

## Prerequisites

Before you begin, make sure you have the following installed:

- **[Docker](https://docs.docker.com/get-docker/)**: Ensure Docker is installed and running on your machine.
- **[Docker Compose](https://docs.docker.com/compose/install/)**: Ensure Docker Compose is installed for managing multi-container applications.

### 1. Install Docker (if not already installed)

Follow the official Docker installation guide for your operating system:

- **Windows**: [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- **Mac**: [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
- **Linux**: [Install Docker on Linux](https://docs.docker.com/engine/install/)

### 2. Install Required Docker Containers

You need to set up the following Docker containers:

#### 2.1 Install a PostgreSQL Docker Container

Run the following command to start a PostgreSQL container named `some-postgres`:

!make sure the password for Postgres is 1234
```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=example -d postgres
```

#### 2.2 Install a Redis Docker Container

Run the following command to start a Redis container named `some-redis`:

!make sure the password for Redis is 1234
```bash
docker run --name some-redis -d redis
```

#### 2.3 Install a RabbitMQ Docker Container
```bash
docker run --name some-rabbit -d rabbitmq:management
```
### 3. Install Database from database.sql

Using the Postgres instance, create a db_spotify database and import the data from database.sql

### 4. Set Up and Run the Backend with Docker Compose
Navigate to the backend project folder BE_spotify/:

```bash
cd BE_spotify/
```

Make sure to create a Docker network named node-network:

```bash
docker network create node-network
```

Run the backend services using Docker Compose:

```bash
docker-compose up
```

### 5. Import the Postman Collection
1. Open Postman and go to the Import button in the top-left corner.
2. Select File and import the postman.json file that contains the API requests.
3. Once imported, you can test the API by running the requests in Postman.
