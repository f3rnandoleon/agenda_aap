import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AnotacionesList = ({ anotaciones }) => {


  const renderItem = ({ item }) => (
    <View style={[styles.anotacionContainer, { backgroundColor: '#FFD166' }]}>
      <MaterialIcons name="note" size={32} color="#FFF" style={styles.noteIcon} />
      <View style={styles.anotacionInfo}>
        <Text style={styles.contenido}>
          <Text style={styles.bold}>Contenido:</Text> {item.contenido}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Profesor:</Text> {item.nombre_profesor}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Correo del profesor:</Text> {item.email_profesor}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Fecha:</Text> {formatDate(item.fecha)}
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
      data={anotaciones}
      renderItem={renderItem}
      keyExtractor={(item) => item.id_anotacion.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  anotacionContainer: {
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
  noteIcon: {
    marginRight: 15,
  },
  anotacionInfo: {
    flex: 1,
  },
  contenido: {
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

export default AnotacionesList;
