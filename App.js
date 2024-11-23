import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsersScreen from "./screens/UsersScreen";
import ExperiencesScreen from "./screens/ExperiencesScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchExperience from "./screens/SearchExperience";

// Importa las imágenes de los iconos
import iconoUsuarios from './assets/icons/user.jpg';
import iconoHome from './assets/icons/home.jpg';
import iconoExperiencias from './assets/icons/experiencias.jpg';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
<Tab.Navigator
  initialRouteName="Home"
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconSource;

      if (route.name === "Usuarios") {
        iconSource = iconoUsuarios;
      } else if (route.name === "Home") {
        iconSource = iconoHome;
      } else if (route.name === "Experiencias") {
        iconSource = iconoExperiencias;
      } else if (route.name === "Buscar") {
        iconSource = require("./assets/icons/search.png"); // Añadir un icono para búsqueda
      }

      return (
        <Image
          source={iconSource}
          style={{
            width: focused ? 30 : 25,
            height: focused ? 30 : 25,
          }}
          resizeMode="contain"
        />
      );
    },
    tabBarActiveTintColor: "#42f44b",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      display: "flex",
    },
  })}
>
  <Tab.Screen name="Usuarios" component={UsersScreen} />
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Experiencias" component={ExperiencesScreen} />
  <Tab.Screen name="Buscar" component={SearchExperience} />
</Tab.Navigator>;
    </NavigationContainer>
  );
}
