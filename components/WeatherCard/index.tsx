import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
const WeatherCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cityRemove}>
        <Ionicons name="remove-circle" size={24} color="black" />
        <Text>Hello World</Text>
      </View>

      <View style={styles.iconTemp}>
        <Feather name="sun" size={24} color="black" />
        <Text>6°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 80,
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginHorizontal: "7%",
    marginTop: "5%",
  },
  iconTemp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cityRemove: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});

export default WeatherCard;
