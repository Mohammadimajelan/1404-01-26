# Machining Equipment Scheduler

A web application for automatic scheduling of machining equipment, featuring a visual timeline and real-time updates.

## Features

- Visual Gantt chart display of machining schedules
- Real-time updates when schedule changes occur
- Automatic schedule recalculation based on priority changes
- Machine status tracking
- Order management system

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a .env file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/machining-scheduler
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run client
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Add machines through the API or directly in the database
2. Create new orders using the "New Order" form
3. View the schedule in the Gantt chart
4. Modify order priorities to automatically recalculate the schedule

## API Endpoints

### Orders
- GET /api/orders - Get all orders
- POST /api/orders - Create new order
- PATCH /api/orders/:id/priority - Update order priority

### Machines
- GET /api/machines - Get all machines
- POST /api/machines - Create new machine
- PATCH /api/machines/:id/status - Update machine status

## Technologies Used

- React
- Node.js
- Express
- MongoDB
- Socket.IO
- Material-UI
- DHTMLX Gantt 