# health-front-app

This front-end application is built with Vite, React, and Typescript. It provides a user interface for registering, selecting symptoms, and receiving possible diagnoses. If a diagnosis is accurate, users can save it in their history. The application uses npm as the package manager.

## Features

- User registration and authentication.
- Selecting symptoms and receiving possible diagnoses.
- Saving accurate diagnoses to user history.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

``git clone https://github.com/fgarancini/health-front-app``

2. Navigate to the project directory:

``cd health-front-app``

3. Install dependencies:

``npm install``

## Usage

1. Ensure that the Laravel API is running on the specified address (default: `http://0.0.0.0:80`).

2. Start the development server:

``npm run dev``

3. Access the application from your web browser at [http://localhost:5173](http://localhost:5173).

4. Register a new account or log in with existing credentials.

5. Use the provided user interface to select symptoms and receive diagnoses.

6. Save accurate diagnoses to your user history.

## Configuration

The project includes an `.env` file where you can configure the API URL:

- `VITE_APP_API_URL`: The URL for the Laravel API (e.g., `http://0.0.0.0:80`).

- Or in the `config.ts` file you can hardcode the URL

You can modify this variable to point to the correct API URL.