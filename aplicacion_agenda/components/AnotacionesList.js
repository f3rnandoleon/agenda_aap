import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc,getDocs,collection } from 'firebase/firestore'; 
import { firebaseConfig } from '../firebase-config';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const AnotacionesList = ({ anotaciones }) => {
  const [profesores, setProfesores] = useState([]);
  useEffect(() => {
    fetchProfesores();
  }, []);
  async function fetchProfesores ()  {
    try {
      const querySnapshot = await getDocs(collection(db, "profesores"));
      const profData = [];
      querySnapshot.forEach((doc) => {
        profData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log(profData);
      setProfesores(profData);
    } catch (error) {
      console.error("Error al obtener los documentos: ", error);
    }
  }
  const getProfesorName = (profesorId) => {

    const profesor = profesores.find(prof => prof.id === profesorId.id);
    return profesor ? profesor.nombre : 'Nombre no encontrado'; // Manejar caso cuando el profesor no se encuentra
  };
  const renderItem = ({ item }) => (
    <View style={[styles.anotacionContainer, { backgroundColor: '#FFD166' }]}>
      <MaterialIcons name="note" size={32} color="#FFF" style={styles.noteIcon} />
      <View style={styles.anotacionInfo}>
        <Text style={styles.contenido}>
          <Text style={styles.bold}>Titulo:</Text> {item.titulo}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Descripcion:</Text> {item.descripcion}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Estado:</Text> {item.estado ? 'Activo' : 'Inactivo'}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Profesor:</Text> {getProfesorName(item.id_profesor)}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Fecha Asignada:</Text> {formatDate(item.fecha_creacion)}
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
      keyExtractor={(item) => item.id.toString()}
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
