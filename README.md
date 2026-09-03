# MERN Live Weather App

A React + Express weather application using OpenWeather.

## Project structure

weather-app/
- server/
- client/

## 1. Start backend

```bash
cd server
npm install
npm start
```

Backend:
http://localhost:5000

Test:
http://localhost:5000/api/weather?city=Coimbatore

## 2. Start frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend:
http://localhost:5173

## API

The backend calls:

- OpenWeather current weather API
- OpenWeather 5-day / 3-hour forecast API

The API key is stored in `server/.env` and is not exposed directly to React.

## Important

The supplied OpenWeather API key was included in this project because it was provided for this development task. For production, regenerate/restrict the key and use a private environment variable.

## Search

You can search Indian cities such as:

- Coimbatore
- Chennai
- Bengaluru
- Ahmedabad
- Mumbai
- Delhi
- Hyderabad
