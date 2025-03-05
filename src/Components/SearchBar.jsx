import React, { useState } from "react";
import PropTypes from "prop-types";
import sunicon from "./sun.png";
import thundericon from "./thunder.png";
import rainicon from "./rain.png";
import cloudyDayicon from "./cloudy-day.png";
import cloudynighticon from "./cloudy-night.png";
import mistyicon from "./mist.png";
import temperature from "./temperature.png";
import humidityIcon from "./humidity.png";
import uvindex from "./uvindex.png";
import wind from "./wind.png";
import weathericon from "./weather-app.png";
import settingicon from "./settings.png";
import Setting from "./Setting";
function SearchBar({ setCity, weatherData }) {
  const [input, setInput] = useState("");
  const [showSetting, setShowSetting] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" && input.trim()) {
      setCity(input.trim());
      setInput("");
    }
  };

  const iconChange = (condition, isDay) => {
    if (!condition) return sunicon;
    const weatherCondition = condition.toLowerCase();
    if (weatherCondition.includes("sunny")) return sunicon;
    if (weatherCondition.includes("thunder")) return thundericon;
    if (weatherCondition.includes("rain")) return rainicon;
    if (weatherCondition.includes("mist")) return mistyicon;
    if (weatherCondition.includes("cloudy")) {
      return isDay ? cloudyDayicon : cloudynighticon;
    }
    return sunicon;
  };

  if (!weatherData)
    return <span className="text-white">Loading weather data...</span>;

  const { location, current, forecast } = weatherData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full gap-4">
        <img
          src={weathericon}
          alt="Weather icon"
          className="w-8 h-8 md:w-10 md:h-10 "
        />

        <input
          type="text"
          placeholder="Search for cities"
          className="flex-1 text-white bg-slate-800 rounded-2xl text-center p-2 min-w-[100px] max-w-full md:max-w-2xl md:h-13"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          className="p-2 bg-gray-700 text-white rounded-md"
          onClick={() =>setShowSetting(!showSetting)}
        >
          {" "}
          <img
            src={settingicon}
            alt="Settings icon"
            className="w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:scale-110 transistion-transform"
          />
        </button>
        {showSetting&&<Setting onClose={()=>setShowSetting(false)}/>}
      </div>

      {/* Current Weather */}
      <div className="flex flex-col md:flex-row justify-between items-center p-5 bg-slate-800 rounded-xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-white">{location.name}</h1>
          <p className="text-slate-200 font-extrabold">
            {current.condition.text}
          </p>
          <h1 className="text-5xl text-white font-bold">
            {current.temp_c}&#176;
          </h1>
        </div>
        <img
          src={iconChange(current.condition.text, current.is_day)}
          alt="weather icon"
          className="w-32 h-32 md:w-40 md:h-40"
        />
      </div>

      {/* Today's Forecast */}
      <div className="bg-slate-800 p-4 rounded-xl">
        <h2 className="text-slate-300 font-extrabold mb-4">TODAY'S FORECAST</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {forecast.forecastday[0].hour
            .filter((_, index) => index % 2 === 0)
            .map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-2 bg-slate-700 rounded-lg"
              >
                <span className="text-xl text-slate-300">
                  {hour.time.slice(11)}
                </span>
                <img
                  src={iconChange(hour.condition.text, 1)}
                  alt="hourly icon"
                  className="w-10 h-10"
                />
                <span className="text-white">{hour.temp_c}&#176;</span>
              </div>
            ))}
        </div>
      </div>

      {/* Air Conditions */}
      <div className="bg-slate-800 p-4 rounded-xl">
        <h2 className="text-slate-300 font-extrabold mb-4">AIR CONDITIONS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Real Feel",
              value: `${current.feelslike_c}°`,
              icon: temperature,
            },
            { label: "Wind", value: `${current.wind_kph} km/h`, icon: wind },
            {
              label: "Humidity",
              value: `${current.humidity}%`,
              icon: humidityIcon,
            },
            { label: "UV Index", value: current.uv, icon: uvindex },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-slate-700 rounded-lg"
            >
              <img
                src={item.icon}
                alt={`${item.label} icon`}
                className="w-6 h-6"
              />
              <span className="text-white">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  setCity: PropTypes.func.isRequired,
  weatherData: PropTypes.object,
};

export default SearchBar;
