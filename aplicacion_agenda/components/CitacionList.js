import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CitacionList = ({ tareas }) => {

  const renderItem = ({ item }) => (
    <View style={styles.tareaContainer}>
      <MaterialIcons name="assignment" size={32} color="black" style={styles.taskIcon} />
      <View style={styles.tareaInfo}>
        <Text style={styles.titulo}>Tarea asignado por {item.nombre_profesor}</Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Descripción:</Text> {item.motivo_de_citacion}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Equipo:</Text> {item.nombre_equipo}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Estudiante:</Text> {item.name} {item.lastname}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Fecha de entrega:</Text> {formatDate(item.date_at)}
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
      data={tareas}
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
    fontFamily: 'Roboto-Bold',
    color: 'black',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
    color: 'black',
  },
  bold: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
});

export default CitacionList;
