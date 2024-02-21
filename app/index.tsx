import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ModalScreen from "@/components/Modal";
import WeatherImages from "@/components/Icons/index";
import { handleSearch } from "@/components/api";

type Weather = {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    wind_kph: number;
    humidity: number;
  };
};
type Forecast = {
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }[];
  };
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [city, onChangeCity] = useState("London");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  let date = new Date();
  let dates = [];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    handleSearch(city, setWeather, setForecast, setShowSearch);
    onChangeCity("");
  }, []);
  for (let i = 0; i < 5; i++) {
    date.setDate(date.getDate() + 1);
    let formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    dates.push(formattedDate);
  }
  

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.header}>
        <Feather
          name="menu"
          size={24}
          color="black"
          onPress={() => setIsOpen(!isOpen)}
        />
        {showSearch ? (
          <View style={styles.search}>
            <TextInput
              style={styles.input}
              placeholder="Entre your city"
              value={city}
              onChangeText={onChangeCity}
            />
            <Pressable
              onPress={() =>
                handleSearch(city, setWeather, setForecast, setShowSearch)
              }>
              <Feather name="search" size={24} color="black" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.search}>
            <Pressable
              onPress={() =>
                handleSearch(city, setWeather, setForecast, setShowSearch)
              }>
              <Feather name="search" size={24} color="black" />
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.main}>
        <View style={styles.widget}>
        <Text style={styles.TextBig} onPress={() => {}}>
          {weather?.location?.name || "City"}
        </Text>

        {weather?.current?.condition?.text
          ? WeatherImages(100)[weather?.current?.condition?.text]
          : WeatherImages(100)["Mist"]}

        <View style={styles.temp}>
          <Text style={styles.TextBig}>
            {weather?.current?.temp_c
              ? Math.floor(weather.current.temp_c)
              : "0"}
            °C
          </Text>
          <Text style={styles.TextMedium}>{weather?.current?.condition?.text}</Text>
        </View>
        </View>
        <View style={styles.widgetContainer}>
          <View style={styles.widget}>
            <Feather name="wind" size={24} color="black" />
            <Text>{weather?.current?.wind_kph} km/h</Text>
          </View>
          <View style={styles.widget}>
            <Ionicons name="water-outline" size={24} color="black" />
            <Text>{weather?.current?.humidity}%</Text>
          </View>
          <View style={styles.widget}>
            <Feather name="sunrise" size={24} color="black" />
            <Text>{forecast?.forecast?.forecastday[0].astro.sunrise}</Text>
          </View>
          <View style={styles.widget}>
            <Feather name="sunset" size={24} color="black" />
            <Text>{forecast?.forecast?.forecastday[0].astro.sunset}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.TextMedium}>Daily Forecast</Text>
          <View style={styles.forecastContainer}>
            {forecast?.forecast?.forecastday?.map((item, index) => {
              console.log(item.day.condition.text);
              
              return(
              <View key={index} style={styles.widget}>
                <Text>{days[new Date(item.date).getDay()]}</Text>
                {WeatherImages(36)[item.day.condition.text] ||
                  WeatherImages(36)["Mist"]}
                <Text>{item.day.avgtemp_c}°C</Text>
              </View>)
})}
          </View>
        </View>
      </View>
      <ModalScreen isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    alignItems: "center",
    height: 40,
  },
  TextBig: {
    fontSize: 46,
  },
  TextMedium: {
    fontSize: 24,
    marginBottom: "5%",
    paddingHorizontal: "5%",
  },
  temp: {
    gap: 10,
  },
  main: {
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  widgetContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "15%",
    paddingHorizontal: "5%",
    marginHorizontal: "5%",
  },
  widget: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
    paddingHorizontal: "5%",
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  input: {
    backgroundColor: "lightgrey",
    height: 40,
    width: "70%",
    borderRadius: 10,
    paddingHorizontal: "4%",
  },
  search: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default HomePage;
