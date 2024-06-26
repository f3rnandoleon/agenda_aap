import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TareasList = ({ tareas }) => {
  
  const renderItem = ({ item }) => (
    <View style={[styles.tareaContainer, { backgroundColor: "#FF6F61" }]}>
      <MaterialIcons name="assignment" size={32} color="#FFF" style={styles.taskIcon} />
      <View style={styles.tareaInfo}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Descripción:</Text> {item.descripcion}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Curso:</Text> {item.nombre_curso}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Profesor:</Text> {item.nombre_profesor}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Fecha de entrega:</Text> {formatDate(item.fecha_entrega)}
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
      keyExtractor={(item) => item.id_tarea.toString()}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default TareasList;
