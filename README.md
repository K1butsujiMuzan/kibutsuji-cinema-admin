# Kibutsuji Admin Panel

## Description

Kibutsuji Admin Panel is a desktop application built with Wails that provides an interface for managing anime content, user subscriptions, and platform statistics. The application combines a React frontend with a Go backend, packaged as a native desktop application.

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Router DOM
- React Hook Form
- Zod
- Zustand
- Chart.js & React-ChartJS-2
- React-PDF
- XLSX

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Go (v1.21 or higher)
- Wails CLI

### Install Wails
```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### Clone the repository

```bash
git clone https://github.com/K1butsujiMuzan/kibutsuji-cinema-admin.git
cd kibutsuji-cinema-admin
```

### Install frontend dependencies
```bash
cd frontend
npm install 
#or
yarn install
cd ..
```

### Development and Building
```bash
# Development
wails dev
# Production build
wails build
```

## Environment Variables
Create a .env file in the frontend directory:
```bash
VITE_BASE_URL=https://kibutsuji-cinema.vercel.app/api
```