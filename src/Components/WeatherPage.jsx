import React, { useEffect } from "react";
import "../Components/style.css";

function WeatherPage() {
  const [city, setCity] = React.useState("");
  const [weatherData, setWeatherData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const resp = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resp();
  };

  useEffect(() => {
    if (city) {
      resp();
    }
  }, [city]);

  return (
    <div className="weather-app">
      {/* Hero Section */}
      <div className="hero text-center">
        <h1 className="title">Weather App</h1>
        <p className="subtitle">Get real-time weather information</p>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          className="input-field"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Get Weather
        </button>
      </div>

      {/* Loader */}
      {loading && <div className="spinner"></div>}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Weather Card */}
      {weatherData && (
        <div className="weather-card animate-slide-in">
          <h2 className="city-name">{city}</h2>
          <p>Temperature (C): {weatherData.weather[0].avgtempC}°C</p>
          <p>Temperature (F): {weatherData.weather[0].avgtempF}°F</p>
          <p>
            Weather: {weatherData.current_condition[0].weatherDesc[0].value}
          </p>
          <p>Sunrise: {weatherData.weather[0].astronomy[0].sunrise}</p>
          <p>Sunset: {weatherData.weather[0].astronomy[0].sunset}</p>
          <p>
            Wind Speed: {weatherData.current_condition[0].windspeedKmph} kmph
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
