import { 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView 
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CitacionList from '../../components/CitacionList';
import Cargando from '../../components/Cargando';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from "firebase/firestore"; 
import { firebaseConfig } from '../../firebase-config';

export default function HomeScreen() {
  const [citaciones, setCitaciones] = useState([]);
  const [userId, setUserId] = useState(null);
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id !== null) {
        setUserId(id);
      }
    } catch (error) {
      console.error('Error retrieving userId:', error);
    }
  };

  const fetchData = async (userId) => {
    try {
      console.log(`Fetching data for userId: ${userId}`);
      const estudianteRef = doc(db, 'estudiantes', userId);
      const estudianteSnap = await getDoc(estudianteRef);

      if (estudianteSnap.exists()) {
        const estudianteData = estudianteSnap.data();
        console.log('Estudiante data:', estudianteData);

        // Obtener referencia del curso
        const cursoRef = estudianteData.id_curso;
        const cursoSnap = await getDoc(cursoRef);
        if (cursoSnap.exists()) {
          const cursoId = cursoSnap.id;

          const citacionesQuery = query(
            collection(db, 'citaciones'),
            where('idcurso', 'array-contains', `/cursos/${cursoId}`)
          );

          const citacionesSnap = await getDocs(citacionesQuery);
          const citacionesList = citacionesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log('Citaciones fetched:', citacionesList);
          setCitaciones(citacionesList);
        } else {
          console.log('No such curso!');
        }
      } else {
        console.log('No such student!');
      }
    } catch (error) {
      console.error("Error fetching citaciones:", error);
    }
  };

  if (!userId) {
    return <Cargando />;
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>CITACIONES</Text>
      </View>
      <View style={styles.contentContainer}>
        {citaciones.length > 0 ? (
          <SafeAreaView>
            <CitacionList citaciones={citaciones} />
          </SafeAreaView>
        ) : (
          <View style={styles.noCitacionesContainer}>
            <Image
              style={styles.noCitacionesImage}
              source={{
                uri: "https://cdn.icon-icons.com/icons2/3789/PNG/512/conference_communication_discussion_business_presentation_meeting_team_icon_232577.png",
              }}
            />
            <Text style={styles.noCitacionesText}>
              ¡Felicidades! No tiene ninguna citación.
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    marginTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 10,
  },
  noCitacionesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
  },
  noCitacionesImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noCitacionesText: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
