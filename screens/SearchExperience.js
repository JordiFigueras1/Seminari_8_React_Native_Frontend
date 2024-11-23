import React, { useState } from "react";
import { searchUsers } from "../services/userService"; // Método para buscar usuarios
import { fetchExperiences } from "../services/experienceService"; // Método para obtener experiencias
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function SearchExperience() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Usuarios encontrados
  const [experiences, setExperiences] = useState([]); // Experiencias relacionadas

  const handleSearch = async () => {
    try {
      // Buscar usuarios por nombre
      const users = await searchUsers(searchQuery); // Llamada al servicio
      setSearchResults(users);

      if (users.length > 0) {
        // Obtener todas las experiencias
        const allExperiences = await fetchExperiences();

        // Filtrar las experiencias relacionadas con el/los usuario(s) encontrado(s)
        const userIds = users.map((user) => user._id); // Extraer los IDs de los usuarios
        const relatedExperiences = allExperiences.filter((exp) =>
          userIds.includes(exp.owner) // Verificar si el propietario es uno de los usuarios encontrados
        );

        setExperiences(relatedExperiences);
      } else {
        setExperiences([]); // Limpiar si no hay usuarios encontrados
      }
    } catch (error) {
      console.error("Error al buscar experiencias:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Experiencias</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre del usuario"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Usuarios Encontrados:</Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text style={styles.userText}>{item.name}</Text>}
      />

      <Text style={styles.subtitle}>Experiencias Relacionadas:</Text>
      <FlatList
        data={experiences}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.experienceItem}>
            <Text style={styles.experienceText}>
              Propietario: {item.owner}
            </Text>
            <Text style={styles.experienceText}>
              Descripción: {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#8B0000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  userText: {
    color: "#fff",
    marginBottom: 5,
  },
  experienceItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  experienceText: {
    fontSize: 14,
    color: "#333",
  },
});
