"use client"
import { useState } from 'react';
import { fetchWeatherData } from '../../utils/weatherapi';
import Cloudyimg from '../assets/cloudy.svg';
import Sunnyimg from '../assets/sunny.svg';
import Rainyimg from '../assets/rainy.svg';
import Image from 'next/image';

const WeatherShowcase = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
  
    const handleSearch = async (e) => {
      e.preventDefault();
      if (city) {
        try {
          const data = await fetchWeatherData(city);
          setWeatherData(data);
          setError(null);

          const alreadySearched = history.find(
            (item) => item.name.toLowerCase() === data.name.toLowerCase()
          );
          if (!alreadySearched) {
            setHistory([...history, data]);
          }
        } catch (err) {
          setError(err.message);
          setWeatherData(null);
        }
      }
    };

    const getWeatherImage = (weatherCondition) => {
      switch (weatherCondition) {
        case "Clear":
          return Sunnyimg;
        case "Rain":
          return Rainyimg;
        case "Clouds":
          return Cloudyimg;
        default:
          return Cloudyimg;
      }
    };
  
    return (
      <div className="flex flex-col items-center">
        <form onSubmit={handleSearch} className='p-2 ml-3 flex gap-x-2'>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="enter city name"
            className="input rounded-lg p-4 text-black text-xl"
          />
          <button type="submit" className="btn text-xl p-1">Search</button>
        </form>
  
        {error && <div className="error">{error}</div>}
  
        {weatherData && (
          <div className="weather-card p-4 rounded-lg flex flex-col gap-y-4 mt-3 bg-[#24353E]">
            <div className='flex justify-end'>
              <Image
                src={getWeatherImage(weatherData.weather[0].main)}
                alt={weatherData.weather[0].main}
                width={200}
                height={200}
              />
            </div>
            <div className='flex justify-between gap-4'>
              <h2 className="weather-title text-3xl font-bold">{weatherData.name}</h2>
              <p className='text-3xl'>{weatherData.main.temp}°C</p>
            </div>
            <p className='text-xl'>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p className='text-xl'>Date: {new Date().toLocaleDateString()}</p>
            <p className='text-2xl'>{weatherData.weather[0].main === 'Clear' ? 'Sunny' : weatherData.weather[0].main}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="history mt-4">
            <h3 className="text-2xl font-bold mb-2">Search History</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="weather-card p-4 rounded-lg flex flex-col gap-y-4 mt-3 bg-[#24353E]"
                >
                  <div className='flex justify-end'>
                    <Image
                      src={getWeatherImage(item.weather[0].main)}
                      alt={item.weather[0].main}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="flex gap-4">
                    <h2 className="weather-title text-3xl font-bold">
                      {item.name}
                    </h2>
                    <p className="text-3xl">{item.main.temp}°C</p>
                  </div>
                  <p className="text-xl">Wind Speed: {item.wind.speed} m/s</p>
                  <p className="text-xl">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-2xl">
                    {item.weather[0].main === "Clear"
                      ? "Sunny"
                      : item.weather[0].main}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default WeatherShowcase;

