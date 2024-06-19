import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CitacionList = ({ citaciones }) => {
  const renderItem = ({ item }) => (
    <View style={styles.tareaContainer}>
      <MaterialIcons name="assignment" size={32} color="black" style={styles.taskIcon} />
      <View style={styles.tareaInfo}>
        <Text style={styles.titulo}>Citacion asignada por {item.nombre_profesor}</Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Motivo:</Text> {item.motivo}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Grado:</Text> {item.grado}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Curso:</Text> {item.curso}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Estudiante:</Text> {item.nombre_estudiante}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Fecha de citación:</Text> {formatDate(item.fecha)}
        </Text>
      </View>
    </View>
  );

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <FlatList
      data={citaciones}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tareaContainer: {
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Asegúrate de tener un color de fondo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  taskIcon: {
    marginRight: 15,
  },
  tareaInfo: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default CitacionList;
