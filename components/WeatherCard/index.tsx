
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
type Props ={
  name: string;
  temp: number;
  svg: React.ReactElement;

}
const WeatherCard:FC<Props> = ({name,temp,svg}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cityRemove}>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.iconTemp}>
        {svg}
        <Text style={styles.text} >{temp}°C</Text>
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
    gap: 20,
    justifyContent: "center",
  },
  cityRemove: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  text:{
    fontSize: 24,
    fontWeight: "600",
  }
});

export default WeatherCard;
