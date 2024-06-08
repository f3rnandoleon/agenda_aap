import { 
  Image, 
  StyleSheet, 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView 
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import {ip} from "../../constants/ip";
import CitacionList from '../../components/CitacionList';

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(null);

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
      const response = await fetch(`http://${ip()}/citaciones/${userId}`);
      const data = await response.json();
      
      console.log(data[0].id_citacion);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!userId) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>CITACIONES</Text>
      </View>
      
    
        <View style={styles.contentContainer}>
          {todos.length > 0 ||todos!=undefined ? (
            <SafeAreaView>
              <CitacionList citaciones={todos} />
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
