

export const fetchWeatherData = async (city) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error('City not found');
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };  