import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ModalPortal } from "react-native-modals";

export default function Layout() {
  return (
    <>
    <Tabs
    
    screenOptions={{ // Cambia el color según tus necesidades
      tabBarStyle: { backgroundColor: 'white',height:60 }, // Añade el estilo de fondo blanco
      headerShown: false,
    }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Tareas",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="book" size={34} color="#7CB9E8" />
            ) : (
              <AntDesign name="book" size={24} color="black" />
            )
            
        }}
      />
      <Tabs.Screen
        name="citaciones"
        options={{
          tabBarLabel: "citaciones",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="tasks" size={34} color="#7CB9E8" />
            ) : (
              <FontAwesome name="tasks" size={24} color="black" />
            )
        }}
      />
      <Tabs.Screen
        name="informacion"
        options={{
          tabBarLabel: "Perfil",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="account-details" size={34} color="#7CB9E8" />
            ) : (
              <MaterialCommunityIcons name="account-details" size={24} color="black" />
            )
        }}
      />
    </Tabs>
    <ModalPortal />
    </>
  );
}
