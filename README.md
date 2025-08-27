# CAB-TRIALS
# Co-Ride - Hyperlocal Ride-Sharing Platform

A modern web-based ride-sharing application that allows users to form groups of 3 or 4 people to carpool or auto-pool between Sector 128 and Sector 62, and vice versa. The goal is to reduce individual travel costs, traffic congestion, and carbon footprint by encouraging shared transportation.

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: MongoDB Atlas
- **HTTP Client**: Axios

## Setup Instructions

### Prerequisites

1. **MongoDB Atlas Account**: Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Python 3.8+**: Required for the Flask backend
3. **Node.js 16+**: Required for the React frontend

### Database Setup

1. **Create MongoDB Atlas Cluster**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (free tier is sufficient)
   - Create a database user with read/write permissions
   - Whitelist your IP address (or use 0.0.0.0/0 for development)

2. **Get Connection String**:
   - In your Atlas dashboard, click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and replace the MongoDB URI with your actual connection string:
   ```
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/coride_db?retryWrites=true&w=majority
   ```

4. **Run the Flask server**:
   ```bash
   python app.py
   ```
   
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root**:
   ```bash
   cd ..
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

## API Endpoints

- `POST /api/submit-ride`: Submit a new ride request or offer
- `GET /api/rides/<direction>/<time_slot>/<vehicle_type>`: Get rides for debugging
- `GET /api/health`: Health check endpoint

## Features

- **Route Selection**: Choose between Sector 62 ↔ Sector 128
- **Ride Matching**: Automatic matching between offers and requests
- **Group Formation**: Auto-form groups of 4 (cab) or 3 (auto) people
- **Real-time Updates**: Instant notifications for matches and group formation
- **Responsive Design**: Works on mobile and desktop devices

## Database Schema

### Rides Collection
```javascript
{
  _id: ObjectId,
  direction: "62_to_128" | "128_to_62",
  time_slot: "HH:MM",
  vehicle_type: "cab" | "auto",
  action_type: "offer" | "request",
  name: String,
  contact: String,
  status: "pending" | "matched" | "grouped",
  group_id: ObjectId (optional),
  created_at: Date,
  updated_at: Date
}
```

### Groups Collection
```javascript
{
  _id: ObjectId,
  direction: "62_to_128" | "128_to_62",
  time_slot: "HH:MM",
  vehicle_type: "cab" | "auto",
  status: "forming" | "complete",
  member_count: Number,
  max_members: Number,
  created_at: Date
}
```
