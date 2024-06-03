import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './API/api';
import { useState } from 'react';
import dateFormat from 'dateformat';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  }

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }
  return (
    <div className="bg-aliceblue flex items-center justify-center py-12 font-poppins">
    <div className="w-96 p-6 text-gray-200 rounded-lg shadow-lg bg-gradient-to-r from-purple-800 to-purple-600">
      <h1 className="text-center text-2xl font-normal">Weather App</h1>
      <div className="flex mt-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
          className="w-full p-2 text-sm text-black rounded-l-md focus:outline-none"
        />
        <button onClick={getWeatherbyCity} className="flex items-center justify-center bg-black text-white rounded-r-md cursor-pointer w-20">
          <Search />
        </button>
      </div>

      {weather && weather.weather && 
        <div className="flex flex-col items-center justify-center bg-opacity-30 bg-black  mt-4 rounded-lg">
          <div className="flex items-center mt-5 mx-auto">
            <MapPin />
            <h2 className="ml-2 text-lg font-semibold">{weather.name} <span className="text-sm">{weather.sys.country}</span></h2>
          </div>
          <p className="text-sm mt-2 mx-auto">{renderDate()}</p>

          <div className="flex flex-col items-center mt-4">
            <img className="filter invert" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <h3 className="text-lg font-normal capitalize">{weather.weather[0].description}</h3>
          </div>

          <div className=" py-5 flex flex-col items-center justify-center mx-auto">
            <h1 className="text-6xl font-extralight  ">{weather.main.temp} <span >&deg;C</span></h1>
            <h3 className="font-normal mt-1">Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
          </div>

          <div className="flex items-center  p-5 bg-opacity-30 bg-black mb-5 rounded-lg">
            <Wind />
            <h3 className="ml-2 font-normal">Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
          </div>
        </div>
      }

      {!weather.weather && 
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-black to-transparent mt-4 rounded-lg">
          <h4>No Data found !</h4>
        </div>
      }
    </div>
  </div>
  );
}

export default App;
