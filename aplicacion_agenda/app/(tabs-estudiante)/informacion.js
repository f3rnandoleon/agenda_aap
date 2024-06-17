import React, { useEffect, useState } from 'react';
import { 
  Image, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Text, 
  View, 
  Pressable, 
  FlatList, 
  SafeAreaView 
} from 'react-native';
import { AntDesign, Feather, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomModal, ModalTitle, ModalContent, SlideAnimation } from "react-native-modals";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ip } from "../../constants/ip";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../../firebase-config';
import InfoUsuario from '../../components/InfoUsuario';
import Cargando from '../../components/Cargando';

export default function HomeScreen() {
  const [todos, setTodos] = useState({});
  const [userId, setUserId] = useState(null);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
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

  const fetchData = async (userId) => {
    if (userId) {
      const userDoc = await getDoc(doc(db, 'estudiantes', userId));
      if (userDoc.exists()) {
        const userData = {
          id: userDoc.id,
          ...userDoc.data()
        }
        setTodos(userData);
      } else {
        console.log("No se encontró el documento");
      }
    } else {
      console.log("Error al localizar identificacion del usuario");
    }
  };

  const getUserId = async () => {
    try {
      const userinf = await AsyncStorage.getItem('userId');
      if (userinf !== null) {
        setUserId(userinf);
      }
    } catch (error) {
      console.error('Error retrieving userId:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      setUserId(null);
      router.replace('/(authenticate)/roles');
    } catch (error) {
      console.error('Error removing userId:', error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const hashedPassword = encryptPassword(newPassword);
      const response = await fetch(`http://${ip()}/alumn/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: hashedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña");
      }
      alert("Contraseña Cambiada correctamente");
      setChangePasswordModalVisible(false);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  if (!userId) {
    return (
      <Cargando />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenido</Text>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        <InfoUsuario user={todos} role="estudiante"/>
        {userId.id_padre ? <InfoUsuario user={todos} rol="padre"/>:null }
      </ScrollView>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </Pressable>
      <Pressable style={styles.changePasswordButton} onPress={() => setChangePasswordModalVisible(true)}>
        <Text style={styles.changePasswordButtonText}>Cambiar contraseña</Text>
      </Pressable>

      <BottomModal
        visible={isChangePasswordModalVisible}
        onTouchOutside={() => setChangePasswordModalVisible(false)}
        modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        width={0.9}
        height={0.4}
        onSwipeOut={() => setChangePasswordModalVisible(false)}
      >
        <ModalTitle title="Cambiar contraseña" />
        <ModalContent>
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar nueva contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Pressable style={styles.confirmButton} onPress={handleChangePassword}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </Pressable>
        </ModalContent>
      </BottomModal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',  // Fondo claro para un buen contraste
    padding: 16,
    
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
  listContent: {
    paddingBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  changePasswordButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    marginTop: 8,
  },
  changePasswordButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  
});
