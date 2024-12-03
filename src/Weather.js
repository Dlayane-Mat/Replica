import React, { useState } from "react";
import WeatherFahrenheit from "./WeatherFahrenheit";
import WeatherIcon from "./WeatherIcon";
import WeatherForecast from "./WeatherForecast";
import FormattedDate from "./FormattedDate";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Weather.css";
import WeatherForecastPreview from "./WeatherForecastPreview";

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
      <div className="Weather text-center">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter city..."
                autoFocus="on"
                onChange={handleCityChange}
                className="form-control"
              />
            </div>
            <div className="col-3">
              <input type="submit" value="Search" className="btn w-100" />
            </div>
          </div>
        </form>
        <div className="details">
          <p>{city}</p>
          <FormattedDate date={weatherData.date} />
        </div>
        <div className="weather-summary">
          <WeatherIcon code={weatherData.icon} size={62} />
          <span className="WeatherFahrenheit">
            <WeatherFahrenheit celsius={weatherData.temperature} />
          </span>
          <div className="description">{weatherData.description}</div>
        </div>
        <div className="current">
          <span>💧♒︎ : {weatherData.humidity}%</span>
          <span>༄𖦹༄ : {weatherData.wind}km/h</span>
        </div>
        <div className="forecast">
          <WeatherForecast
            coordinates={weatherData.coordinates}
            city={weatherData.city}
          />
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
