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
import {ip} from "../../constants/ip";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import TareasList from '../../components/TareaList';
import CitacionList from '../../components/CitacionList';
import bcrypt from 'bcryptjs';
export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

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
      const response = await fetch(`http://${ip()}/alumn/${userId}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
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
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
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
      alert("Contraseña Cambiado correctamente");
      setChangePasswordModalVisible(false);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: `https://example.com/images/${item.image}` }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.nombre_estudiante} {item.apellido_estudiante}</Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Correo electrónico:</Text> {item.email_estudiante}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Teléfono:</Text> {item.telefono_estudiante}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Dirección:</Text> {item.direccion_estudiante}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Fecha de nacimiento:</Text> {formatDate(item.fecha_nacimiento_estudiante)}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Grado:</Text> {item.grado}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Curso:</Text> {item.curso}
        </Text>
        <Text style={styles.sectionTitle}>Información del tutor</Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Nombre:</Text> {item.nombre_tutor}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Correo electrónico:</Text> {item.email_tutor}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Teléfono:</Text> {item.telefono_tutor}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Dirección:</Text> {item.direccion_tutor}
        </Text>
      </View>
    </View>
  );

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenido</Text>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_estudiante.toString()}
        contentContainerStyle={styles.listContent}
      />
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
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
