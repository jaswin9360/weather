import React from "react";
import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  RefreshCw
} from "lucide-react";

const API = "http://localhost:7001/api/weather";

function formatHour(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "numeric"
  });
}

function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

function weatherIcon(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function WeatherDetail({ icon, label, value }) {
  return (
    <div className="detail">
      {icon}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("Coimbatore");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWeather = async (location = "Coimbatore") => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}?city=${encodeURIComponent(location)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Weather not found");
      }

      setWeather(data);
      setCity(data.city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      loadWeather(search.trim());
      setSearch("");
    }
  };

  return (
    <main className="app">
      <section className="weather-card">
        <form className="search" onSubmit={submitSearch}>
          <Search size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city in India..."
          />
          <button type="submit">Search</button>
          <button
            type="button"
            className="refresh"
            onClick={() => loadWeather(city)}
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? "spin" : ""} />
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {weather && (
          <>
            <div className="hero">
              <div>
                <div className="location">
                  <h1>{weather.city}</h1>
                  <MapPin size={22} />
                </div>
                <br />
                <div className="current-temp">
                  {weather.temperature}<sup>₀</sup>
                </div>
              </div>

              <div className="condition">
                <img src={weatherIcon(weather.icon)} alt={weather.description} />
                <h2>{capitalize(weather.weather)}</h2>
                <p>
                  H:{weather.maxTemperature}° &nbsp; L:{weather.minTemperature}°
                </p>
                <small>{capitalize(weather.description)}</small>
              </div>
            </div>

            <div className="hourly">
              {weather.hourly.map((hour, index) => (
                <div className="hour" key={`${hour.time}-${index}`}>
                  <span>{index === 0 ? "Now" : formatHour(hour.time)}</span>
                  <img src={weatherIcon(hour.icon)} alt={hour.description} />
                  <strong>{hour.temperature}°</strong>
                </div>
              ))}
            </div>

            <div className="details">
              <WeatherDetail
                icon={<Droplets />}
                label="Humidity"
                value={`${weather.humidity}%`}
              />
              <WeatherDetail
                icon={<Wind />}
                label="Wind"
                value={`${weather.windSpeed} m/s`}
              />
              <WeatherDetail
                icon={<Gauge />}
                label="Pressure"
                value={`${weather.pressure} hPa`}
              />
              <WeatherDetail
                icon={<Eye />}
                label="Visibility"
                value={`${(weather.visibility / 1000).toFixed(1)} km`}
              />
            </div>

            <div className="sun">
              <div>
                <Sunrise />
                <div>
                  <span>Sunrise</span>
                  <strong>{formatTime(weather.sunrise)}</strong>
                </div>
              </div>

              <div>
                <Sunset />
                <div>
                  <span>Sunset</span>
                  <strong>{formatTime(weather.sunset)}</strong>
                </div>
              </div>
            </div>

            <div className="footer">
              Live weather · Updated {formatTime(weather.updatedAt)}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
