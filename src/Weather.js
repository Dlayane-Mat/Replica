import React, { useState } from "react";
import WeatherFahrenheit from "./WeatherFahrenheit";
import WeatherIcon from "./WeatherIcon";
import WeatherForecast from "./WeatherForecast";
import FormattedDate from "./FormattedDate";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
      feelsElement: response.data.temperature.feels_like,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  function search() {
    const apiKey = "0bd4693b39a661e4b0370fe772t7a9o3";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }
  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter city..."
            autoFocus="on"
            onChange={handleCityChange}
            className="form-control"
          />
          <input type="submit" value="Search" className="btn" />
        </form>
        <h1>{city}</h1>
        <FormattedDate date={weatherData.date} />
        <div className="current">
          <span>💧♒︎:{weatherData.humidity}%</span>
          <span>༄𖦹༄:{weatherData.wind}km/h</span>
        </div>
        <WeatherIcon code={weatherData.icon} size={52} />
        <span className="WeatherFahrenheit">
          <WeatherFahrenheit celsius={weatherData.temperature} />
        </span>
        <div className="description">{weatherData.description}</div>
        <WeatherForecast
          coordinates={weatherData.coordinates}
          city={weatherData.city}
        />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
