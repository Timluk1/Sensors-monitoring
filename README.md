# Temperature Monitoring Application

A full-stack application for monitoring temperature sensors with historical data visualization.
![alt text](/github/image.png)
![alt text](/github/image-1.png)
## Project Structure

- `client/` - React frontend application (Vite + TypeScript)
- `server/` - NestJS backend API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)

### Installation & Development

#### Client (Frontend)

```bash
cd client
npm install
npm run dev
```

The client will be available at `http://localhost:5173` (default Vite port).

#### Server (Backend)

```bash
cd server
npm install
npm run start
```

The server will be available at `http://localhost:3000` (default NestJS port).

## Building for Production

### Build Client

```bash
cd client
npm run build
```

The production build will be output to the `client/dist` directory.

### Build Server

```bash
cd server
npm run build
```

The compiled server code will be output to the `server/dist` directory.

## Tech Stack

### Client
- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Shadcn ui
- Axios

### Server
- NestJS
- TypeScript
