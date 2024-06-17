import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";

import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";

const index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  const compromisos = [
    { date: '2024-06-15', color: 'red' },
    { date: '2024-06-16', color: 'blue' },
    { date: '2024-06-17', color: 'green' },
  ];
  
  useEffect(() => {
    const newMarkedDates = {};
    compromisos.forEach((compromiso) => {
      newMarkedDates[compromiso.date] = {
        marked: true,
        dotColor: compromiso.color,
      };
    });
    setMarkedDates(newMarkedDates);
  }, []);
  console.log(todos);
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7CB9E8" },
          
        }}
        
      />

      <View style={{ marginTop: 20 }} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <Text>Tareas Completadas</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>

      {todos?.map((item, index) => (
        <Pressable
          style={{
            backgroundColor: "#E0E0E0",
            padding: 10,
            borderRadius: 7,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="circle" size={18} color="gray" />
            <Text
              style={{
                flex: 1,
                textDecorationLine: "line-through",
                color: "gray",
              }}
            >
              {item?.title}
            </Text>
            <Feather name="flag" size={20} color="gray" />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
