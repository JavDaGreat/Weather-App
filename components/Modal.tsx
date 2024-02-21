import { Feather } from "@expo/vector-icons";

import React, { FC, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import WeatherCard from "./WeatherCard";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  svg: React.ReactElement;
  temp: number;
  name: string;
};

const ModalScreen: FC<Props> = ({svg , isOpen, onClose,temp,name }) => {
  const slideAnim = useRef(
    new Animated.Value(-Dimensions.get("window").width)
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -Dimensions.get("window").width,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <SafeAreaView style= {styles.SafeArea}>
      <Modal transparent={true} visible={isOpen} onRequestClose={onClose}>
        <Animated.View
          style={[styles.modal, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.header}>
            <Pressable style={styles.flexRow} onPress={onClose}>
              <Feather name="arrow-left" size={24} color="black" />
              <Text>Back</Text>
            </Pressable>

          </View>
          <WeatherCard name={name} temp={temp} svg={svg} />
        
        </Animated.View>
      </Modal>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
  },
  modal: {
    flex: 1,
    paddingTop:75,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
  },
  flexRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});

export default ModalScreen;
