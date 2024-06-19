import { 
  Image, 
  StyleSheet,  
  TextInput, 
  Text, 
  View, 
  Pressable, 
  SafeAreaView,
  FlatList, 
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { BottomModal, ModalTitle, ModalContent, SlideAnimation } from "react-native-modals";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TareasList from '../../components/TareaList';
import AnotacionesList from '../../components/AnotacionesList';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, addDoc,updateDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../../firebase-config';
import Cargando from '../../components/Cargando';

export default function HomeScreen() {
  const [tareas, setTareas] = useState([]);
  const [anotaciones, setAnotaciones] = useState([]);
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const today = moment().format("MMM Do");
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const getButtonStyle = (buttonCategoria) => {
    return [
      styles.categoryButton,
      categoria === buttonCategoria && styles.selectedCategoryButton,
    ];
  };
  const suggestions = [
    { id: "0", todo: "Apunte Psicologia:" },
    { id: "1", todo: "Apunte Fisica: " },
    { id: "2", todo: "Apunte Quimica: " },
    { id: "3", todo: "Apunte Matematicas: " },
    { id: "4", todo: "Apunte Lenguaje: " },
    { id: "5", todo: "Apunte religion: " },
  ];

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTareasEstudiante(userId);
      fetchAnotaciones(userId);
    }
  }, [userId]);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTareas(userId);      // Vuelve a obtener las tareas
    await fetchAnotaciones(userId); // Vuelve a obtener las anotaciones
    setRefreshing(false);
  };
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


  async function fetchAnotaciones (userId)  {
    console.log(userId);
    if (userId) {
      const userRef = doc(db, "estudiantes", userId);  // Crear la referencia al documento del estudiante
      const q = query(collection(db, "anotaciones"), where('id_est', '==', userRef));
      const querySnapshot = await getDocs(q);
      const documentos = [];
      querySnapshot.forEach((doc) => {
      documentos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    console.log(documentos);
    setAnotaciones(documentos)
    } else {
      console.log("Error al localizar identificacion del usuario");
    }
  };

  async function fetchTareasEstudiante(userId) {
    try {
      // 1. Obtener el documento del estudiante
      const estudianteRef = doc(db, "estudiantes", userId);
      const estudianteDoc = await getDoc(estudianteRef);
  
      if (!estudianteDoc.exists()) {
        console.log("No se encontró el estudiante");
        return;
      }
  
      const estudianteData = estudianteDoc.data();
      const idCursoRef = estudianteData.id_curso;
  
      if (!idCursoRef) {
        console.log("El estudiante no tiene curso asignado");
        return;
      }
  
      // 2. Obtener el documento del curso
      const cursoDoc = await getDoc(idCursoRef);
      if (!cursoDoc.exists()) {
        console.log("No se encontró el curso");
        return;
      }
  
      const cursoData = cursoDoc.data();
      const materiasRefs = cursoData.id_materias;
  
      // 3. Obtener las tareas de cada materia
      const tareass = [];
      for (const materiaRef of materiasRefs) {
        const tareasQuery = query(collection(db, "tareas"), where('idmateria', '==', materiaRef));
        const tareasSnapshot = await getDocs(tareasQuery);
        tareasSnapshot.forEach((doc) => {
          tareass.push({
            id: doc.id,
            ...doc.data()
          });
        });
      }
  
      console.log(tareass);
      setTareas(tareass)
    } catch (error) {
      console.error("Error al obtener las tareas: ", error);
    }
  }

  if (!userId) {
    return (
      <Cargando />
    );
  }

  const renderContent = () => {
    switch (categoria) {
      case "Tareas":
        return <TareasList tareas={tareas} />;
      case "Anotaciones":
        return <AnotacionesList anotaciones={anotaciones} />;
      case "Todos":
      default:
        return (
          <FlatList
            data={[]}
            ListHeaderComponent={
              <>
                <TareasList tareas={tareas} />
                <AnotacionesList anotaciones={anotaciones} />
              </>
            }
            renderItem={null}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        );
    }
  };
 

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>TAREAS</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Pressable onPress={() => setCategoria("Todos")} style={getButtonStyle("Todos")}>
          <Text style={styles.categoryButtonText}>Todos</Text>
        </Pressable>
        <Pressable onPress={() => setCategoria("Tareas")} style={getButtonStyle("Tareas")}>
          <Text style={styles.categoryButtonText}>Tareas</Text>
        </Pressable>
        <Pressable onPress={() => setCategoria("Anotaciones")} style={[getButtonStyle("Anotaciones"), styles.lastCategoryButton]}>
          <Text style={styles.categoryButtonText}>Anotaciones</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(!isModalVisible)}>
          <AntDesign name="pluscircle" size={30} color="#007FFF" />
        </Pressable>
      </View>

        <SafeAreaView style={styles.tasksContainer}>
          {tareas?.length > 0 && tareas!=undefined ? (
             
              renderContent()
              
          ) :(
            <View style={styles.noTasksContainer}>
              <Image
                style={styles.noTasksImage}
                source={{ uri: "https://cdn.icon-icons.com/icons2/3252/PNG/512/tasks_app_regular_icon_204842.png" }}
              />
              <Text style={styles.noTasksText}>
                No hay tareas ni anotaciones por hoy! 
              </Text>
              <Pressable onPress={() => setModalVisible(!isModalVisible)} style={styles.addButton}>
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </SafeAreaView>
      
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Nuevo Apunte" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={styles.modalContent}>
          <View style={styles.modalInputContainer}>
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Ingresa una nueva tarea"
              style={styles.modalTextInput}
            />
          </View>
          <Text>Escoger categoria</Text>
          <View style={styles.categorySelectionContainer}>
            <Pressable onPress={() => setCategory("Tarea")} style={styles.categorySelectButton}>
              <Text>Trabajo</Text>
            </Pressable>
            <Pressable onPress={() => setCategory("Personal")} style={styles.categorySelectButton}>
              <Text>Personal</Text>
            </Pressable>
            <Pressable onPress={() => setCategory("WishList")} style={styles.categorySelectButton}>
              <Text>Apuntes</Text>
            </Pressable>
          </View>
          <Text>Algunas Sugerencias</Text>
          <View style={styles.suggestionsContainer}>
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={styles.suggestionButton}
                key={index}
              >
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#E9E9EF", 
  },
  
  contentContainerStyle: { 
    padding: 15, 
  },
  title: {
    fontWeight: "800", 
    fontSize: 28, 
    marginBottom: 15, 
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
  categoryContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#7CB9E8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryButtonText: {
    color: "white",
    textAlign: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#005F8F", // Color más intenso cuando está seleccionado
  },
  lastCategoryButton: {
    marginRight: "auto",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  tasksContainer: {
    padding: 12,
    marginBottom:135,
  },
  mainContainer: {
    display:"flex",
    flexDirection:"column",
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
    marginLeft: "auto",
    marginRight: "auto",
  },
  noTasksImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noTasksText: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  addButton: {
    marginTop: 15,
  },
  modalContent: {
    width: "100%",
    height: 280,
  },
  modalInputContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalTextInput: {
    padding: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
  categorySelectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  categorySelectButton: {
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25,
  },
  suggestionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
  suggestionButton: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },
  spacing: {
    height: 20, // Ajusta esta altura según sea necesario
  },
});
