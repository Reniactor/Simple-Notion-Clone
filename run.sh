# Start Backend
echo "Starting backend..."
cd backend
npm install
npm run start:dev &
# Start Docker
echo "Starting Docker containers..."
docker-compose up -d

# Start Frontend
echo "Starting frontend..."
cd ../frontend
npm install
npm run dev