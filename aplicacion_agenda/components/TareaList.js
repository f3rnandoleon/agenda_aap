import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc,getDocs,collection } from 'firebase/firestore'; 
import { firebaseConfig } from '../firebase-config';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TareasList = ({ tareas }) => {
  const [materias, setMaterias] = useState([]);
  useEffect(() => {
    fetchMaterias();
  }, []);
  async function fetchMaterias ()  {
    try {
      const querySnapshot = await getDocs(collection(db, "materias"));
      const materiaData = [];
      querySnapshot.forEach((doc) => {
        materiaData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log(materiaData);
      setMaterias(materiaData);
    } catch (error) {
      console.error("Error al obtener los documentos: ", error);
    }
  }
  const getMateriaName = (MateriaId) => {
  
    const materia = materias.find(mat => mat.id === MateriaId.id);
    return materia ? materia.nombre : 'Nombre no encontrado'; // Manejar caso cuando el profesor no se encuentra
  };

  const renderItem = ({ item }) => (
    <View style={[styles.tareaContainer, { backgroundColor: "#FF6F61" }]}>
      <MaterialIcons name="assignment" size={32} color="#FFF" style={styles.taskIcon} />
      <View style={styles.tareaInfo}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Descripción:</Text> {item.descripcion}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Estado:</Text> {item.estado ? 'Activo' : 'Inactivo'}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Materia:</Text> {getMateriaName(item.idmateria)}
        </Text>
        <Text style={styles.descripcion}>
          <Text style={styles.bold}>Fecha Asignada:</Text> {formatDate(item.fecha_creacion)}
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
