
import React from 'react';
import weathericon from './weather-app.png';
import weather from './weather.png';
import settingicon from './settings.png';
import mapicon from './map.png';
import citiesicon from './cities.png';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 rounded-t-3xl z-10 xl:static xl:w-20 xl:min-h-screen">
      <ul className="flex justify-around items-center p-2 xl:flex-col xl:space-y-10">
        {[
          { icon: weathericon, label: "Weather" },
          { icon: citiesicon, label: "Cities" },
          { icon: mapicon, label: "Map" },
          { icon: settingicon, label: "Settings" },
        ].map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-center text-white gap-1 cursor-pointer hover:scale-110 transition-transform"
          >
            <img src={item.icon} alt={item.label} className="w-8 h-8" />
            <span className="text-xs">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
