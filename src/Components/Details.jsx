import React from "react";
import PropTypes from "prop-types";

function Details({ weatherData }) {
  if (!weatherData || !weatherData.forecast) {
    return <p className="text-white">Loading 7-day forecast...</p>;
  }

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="text-slate-300 font-extrabold mb-4">7-DAY FORECAST</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weatherData.forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-slate-700 rounded-lg"
          >
            <span className="text-white font-bold">
              {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
            </span>
            <img src={day.day.condition.icon} alt="forecast icon" className="w-10 h-10" />
            <span className="text-white">{day.day.maxtemp_c}° / {day.day.mintemp_c}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Details.propTypes = {
  weatherData: PropTypes.object,
};

export default Details;
