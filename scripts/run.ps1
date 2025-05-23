cd ../docker
docker-compose up -d
cd ../server
dotnet build ./src/OrderTracking.API/OrderTracking.API.csproj
dotnet run --project ./src/OrderTracking.API/OrderTracking.API.csproj
cd ../client
npm install
npm run dev -- --port 5195