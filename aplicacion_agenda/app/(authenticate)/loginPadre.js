import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CryptoJS from 'crypto-js';
import { ip } from "../../constants/ip";
import bcrypt from 'bcryptjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../../firebase-config';

const login = () => {
  const router = useRouter();
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]); 
  
  const app = initializeApp(firebaseConfig);
  //const auth = getAuth(app);
  const db = getFirestore(app);
  
  useEffect(() => {
    fetchPadres();
  }, []);

  async function fetchPadres() {
    const q = query(collection(db, 'padres'));
    const professorsData = (await getDocs(q)).docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    setUsers(professorsData);
}

  const encryptPassword = (password) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

 /* const handleSignIn = () => {
    signInWithEmailAndPassword(auth, carnet, password)
      .then((userCredential) => {
        console.log('Ingresado')
        const user = userCredential.user;
        console.log(user)
        router.replace("/(tabs-estudiante)/home");
      })
      .catch(error => {
        console.log(error)
      })
  };*/

  const handleLogin = async () => {
    const hashedPassword = encryptPassword(password);
    const user = users.find(user => user.correo === carnet );
    console.log(user.correo);
    if (user) {
      if (user.password===hashedPassword) {
        
        await AsyncStorage.setItem('userId', user.id);
        router.replace("/(tabs-estudiante)/home");
        alert(`Bienvenido ${user.nombre}`);
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("email no encontrado");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace("/(authenticate)/roles")} style={styles.headerButton}>
          <AntDesign name="back" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Bienvenido Padre de Familia</Text>
        <Text style={styles.titleText}>Ingrese sus credenciales</Text>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.characterImage}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={carnet}
              onChangeText={(text) => setCarnet(text)}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.inputWrapper}>
            <AntDesign name="lock1" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Contrasena"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Iniciar Sesion</Text>
            <Text style={styles.footerText}>Olvido Contraseña?</Text>
          </View>
          <Pressable onPress={handleLogin} style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Iniciar Sesion</Text>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </Pressable>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  header: {
    position: "absolute",
    top: 20,
    left: 0,
    padding: 16,
    zIndex: 1,
  },
  headerButton: {
    padding: 8,
  },
  titleContainer: {
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop:10,
  },
  inputContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: 300,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    color: "black",
    width: "85%",
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 6,
    width: 200,
    marginTop: 30,
  },
  signInButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 20,
  },
  footerText: {
    color: "#007FFF",
    fontWeight: "500",
  },
});
