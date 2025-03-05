import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import Navbar from "./Components/Navbar";
import Details from "./Components/Details";
import Loading from './Components/Winter-loading.gif';

const API_KEY = "4cefbccbd0be41f297f41318251402";

function App() {
  const [city, setCity] = useState("Udupi");
  const [weatherData, setWeatherData] = useState(null);
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 p-4 gap-5 xl:flex-row pb-2 xl:pb-2">
      {/* <Navbar /> */}
      <div className="flex flex-col gap-5 w-full">
        { loading?(<div className="flex justify-center items-center h-86"><img src={Loading} alt="loading" className="w-20 h-20"/></div>):
         ( <>
         <SearchBar setCity={setCity} weatherData={weatherData} />
          <Details weatherData={weatherData} />
          </>
        )
          
        }
        
      </div>
    </div>
  );
}

export default App;
