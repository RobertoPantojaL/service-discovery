
# Service Discovery Demo

This project demonstrates a simple service discovery system using Consul, with a Node.js backend and a React frontend.

## Project Structure

```
service-discovery-demo/
├── api-gateway/
│   └── index.js
├── services/
│   ├── serviceA.js
│   ├── serviceB.js
│   └── serviceC.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── vite.config.js
├── docker-compose.yml
├── package.json
└── README.md

```
# Service Discovery Demo

This project demonstrates a simple service discovery system using Consul, with a Node.js backend and a React frontend.
![Descripción del GIF](./previe.gif)

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- npm or yarn

## Backend Setup

1. Navigate to the project root directory.
2. Install dependencies:
   ```
    npm install

   ```
3. Start Consul:
    ```
    docker-compose up -d

    ```

### Running the Backend Services

You have two options to run the backend services:

#### Option 1: Using npm script

If available, you can use the following command to start all backend services:

   ```
npm run start:backend

   ```
    
#### Option 2: Running services individually

If the npm script is not available or you prefer to run services independently, open three separate terminals and execute each of the following commands in a different terminal:

```
node services/serviceA.js
node services/serviceB.js
node services/serviceC.js

```

Then, in a fourth terminal, start the API Gateway:

```
node api-gateway/index.js

```

## Frontend Setup

1. Navigate to the `frontend` directory:
    ```
    cd frontend

    ```
2. Install dependencies:
    ```
    npm install

    ```
3. Start the development server:
    ```
    npm run dev

    ```
4. Open your browser and visit `http://localhost:5173` (or the URL provided in the console).

## Testing the System

Once both the backend and frontend are running:

1. The frontend should display cards for Service A, Service B, and Service C.
2. Each card should show the timestamp and service name.
3. The information should update every 5 seconds.

You can also test the API directly:

- Service A: `http://localhost:3000/service-a/info`
- Service B: `http://localhost:3000/service-b/info`
- Service C: `http://localhost:3000/service-c/info`

## Troubleshooting

- Ensure Consul is running (`docker ps` should show a running Consul container).
- Check that all services (A, B, C) and the API Gateway are running.
- Verify that the frontend can connect to the API Gateway (check for CORS issues).

## Additional Notes

- The backend uses Consul for service discovery. Each service registers itself with Consul on startup.
- The API Gateway uses Consul to discover service locations and route requests.
- The frontend periodically fetches service information from the API Gateway to demonstrate the dynamic nature of service discovery.

## Future Improvements

- Add service health checks
- Implement load balancing
- Add more complex service interactions
- Enhance the frontend with more detailed service information and controls

https://roadmap.sh/projects/service-discovery