import { 
  Image, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Text, 
  View, 
  Pressable, 
  SafeAreaView 
} from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { BottomModal, ModalTitle, ModalContent, SlideAnimation } from "react-native-modals";
import moment from "moment";
import {ip} from "../../constants/ip";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TareasList from '../../components/TareaList';

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(null);

  const today = moment().format("MMM Do");
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [categoria, setCategoria] = useState("Todos");

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

  const fetchCitaciones = async (userId) => {
    try {
      const response = await fetch(`http://${ip()}/citaciones/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  async function fetchData(userId) {
    try {
      const response = await fetch(`http://${ip()}/tasks/${userId}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const listaByCategory = () => {
    switch (categoria) {
      case "Todos":
        return (
          <>
            <TareasList tareas={todos} />
            <TareasList tareas={fetchCitaciones(userId)} />
          </>
        );
      case "Tareas":
        return <TareasList tareas={todos} categoria={categoria} />;
      case "Apuntes":
        return <TareasList tareas={fetchCitaciones(userId)} categoria={categoria} />;
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>TAREAS</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Pressable onPress={() => setCategoria("Todos")} style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Todos</Text>
        </Pressable>
        <Pressable onPress={() => setCategoria("Tareas")} style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Tareas</Text>
        </Pressable>
        <Pressable onPress={() => setCategoria("Apuntes")} style={[styles.categoryButton, styles.lastCategoryButton]}>
          <Text style={styles.categoryButtonText}>Personal</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(!isModalVisible)}>
          <AntDesign name="pluscircle" size={30} color="#007FFF" />
        </Pressable>
      </View>

        <View style={styles.tasksContainer}>
          {todos?.length > 0 ? (
            <SafeAreaView>
              {listaByCategory()}
            </SafeAreaView>
          ) : (
            <View style={styles.noTasksContainer}>
              <Image
                style={styles.noTasksImage}
                source={{ uri: "https://cdn.icon-icons.com/icons2/3252/PNG/512/tasks_app_regular_icon_204842.png" }}
              />
              <Text style={styles.noTasksText}>
                No hay tareas ni apuntes por hoy! Añade algun apunte
              </Text>
              <Pressable onPress={() => setModalVisible(!isModalVisible)} style={styles.addButton}>
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      
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
    backgroundColor:"white",
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold', // Cambiar fontWeight de 1000 a 'bold'
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
  lastCategoryButton: {
    marginRight: "auto",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  tasksContainer: {
    padding: 10,
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
});
