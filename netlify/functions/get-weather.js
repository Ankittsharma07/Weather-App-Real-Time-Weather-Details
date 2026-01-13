exports.handler = async (event) => {
  const city = event.queryStringParameters.city || 'mumbai';
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured on Netlify' })
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Forward OpenWeatherMap errors
    if (data.cod && data.cod !== 200) {
      return {
        statusCode: data.cod,
        body: JSON.stringify(data)
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error(error); // This will show in Netlify function logs
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' })
    };
  }
};