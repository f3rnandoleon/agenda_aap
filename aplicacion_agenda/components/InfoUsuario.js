import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../firebase-config';

const InfoUsuario = ({ user, role }) => {
  const [padreData, setPadreData] = useState(null);
  const [cursoData, setCursoData] = useState(null);
  const [estudianteData, setEstudianteData] = useState(null);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
const fetchPadreData = async () => {
    try {
      const padreDocRef = user.id_padre;
      const docSnap = await getDoc(padreDocRef);
      if (docSnap.exists()) {
        const data= docSnap.data();
        setPadreData(data);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  const fetchCursoData = async () => {
    try {
      const cursoDocRef = user.id_curso;
      const docSnap = await getDoc(cursoDocRef);
      if (docSnap.exists()) {
        const data= docSnap.data();
        setCursoData(data);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  useEffect(() => {
    fetchPadreData()
  }, [user.id_padre]);

  useEffect(() => {
    fetchCursoData()
  }, [user.id_curso]);
  const renderStudentInfo = () => (
    <>
      <Text style={styles.name}>{user.nombre} {user.apellido}</Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Correo electrónico:</Text> {user.correo}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Teléfono:</Text> {user.telefono}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Dirección:</Text> {user.direccion}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Fecha de nacimiento:</Text> {formatDate(user.fecha_nacimiento)}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Carnet:</Text> {user.carnet}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Género:</Text> {user.genero}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Curso:</Text> {cursoData ? `${cursoData.nombre} ${cursoData.paralelo}` : "no asignado"}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Padre:</Text> {padreData ? `${padreData.nombre} ${padreData.apellido}` : "no asignado"}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Alergias:</Text> {user.alergias ? user.alergias.join(', ') : ''}
      </Text>
      {padreData ? (
        <>
          <Text style={styles.sectionTitle}>Información del tutor</Text>
          <Text style={styles.name}>{padreData.nombre} {padreData.apellido}</Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Correo electrónico:</Text> {padreData.correo}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Teléfono:</Text> {padreData.telefono}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Dirección:</Text> {padreData.direccion}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Fecha de nacimiento:</Text> {formatDate(padreData.fecha_nacimiento)}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Carnet:</Text> {padreData.carnet}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Género:</Text> {padreData.genero}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Ocupacion:</Text> {padreData.ocupacion}
          </Text>
        </>
      ):(<></>)}
    </>
  );

  const renderParentInfo = () => (
    <>
      <Text style={styles.name}>{user.nombre} {user.apellido}</Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Correo electrónico:</Text> {user.correo}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Teléfono:</Text> {user.telefono}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Dirección:</Text> {user.direccion}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Fecha de nacimiento:</Text> {formatDate(user.fecha_nacimiento)}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Carnet:</Text> {user.carnet}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Género:</Text> {user.genero}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.label}>Ocupacion:</Text> {user.ocupacion}
      </Text>
    </>
  );

  return (
    <View style={styles.itemContainer}>
      
      <View style={styles.infoContainer}>
      <Image source={{ uri: `https://example.com/images` }} style={styles.profileImage} />
        {role === "estudiante" ? renderStudentInfo() : renderParentInfo()}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal:16,
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#007AFF',
      },
      infoContainer: {
        flex: 1,
      },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
      },
      field: {
        fontSize: 16,
        marginBottom: 4,
        color: '#666',
      },
      label: {
        fontWeight: 'bold',
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#333',
      },
});

export default InfoUsuario;