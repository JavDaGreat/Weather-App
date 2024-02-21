export const handleSearch = (
  city: string,
  setWeather: Function,
  setForecast: Function,
  setShowSearch: Function,
  onChangeCity?: Function
) => {
  if (!city) {
    setShowSearch(true);
  } else if (city.length > 3) {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=07563bda797844bfbe8173143242002&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      });
    try {
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=07563bda797844bfbe8173143242002&q=${city}&days=3`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setForecast(data);
          onChangeCity("");
          setShowSearch(false);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
