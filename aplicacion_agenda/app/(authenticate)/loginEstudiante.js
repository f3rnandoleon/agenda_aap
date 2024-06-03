import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import bcrypt from 'bcryptjs';
import { ip } from "../../constants/ip";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const router = useRouter();
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${ip()}/alumns`);
      console.log(ip());
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogin = async () => {
    const user = users.find(user => user.email === carnet);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        await AsyncStorage.setItem('userId', user.id_estudiante.toString());
        router.replace("/(tabs-estudiante)/home");
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
        <Text style={styles.titleText}>AGENDA DIGITAL</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bienvenido Estudiante</Text>
        </View>
        <View style={styles.credentialsContainer}>
          <Text style={styles.credentialsText}>Ingrese sus Credenciales</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
            <TextInput
              value={carnet}
              onChangeText={(text) => setCarnet(text)}
              style={styles.input}
              placeholder="Ingrese su email"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign style={styles.icon} name="lock1" size={24} color="gray" />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Ingrese su contraseña"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.optionsContainer}>
            <Text style={styles.optionsText}>Mantener Sesión</Text>
            <Text style={[styles.optionsText, styles.forgotPasswordText]}>Olvidé mi Contraseña</Text>
          </View>

          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 16,
    zIndex: 1,
  },
  headerButton: {
    padding: 8,
  },
  titleContainer: {
    marginTop: 80,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0066b2",
  },
  welcomeContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  credentialsContainer: {
    alignItems: "center",
  },
  credentialsText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "space-between",
  },
  optionsText: {
    color: "black",
    fontWeight: "500",
  },
  forgotPasswordText: {
    color: "#007FFF",
  },
  loginButton: {
    width: 200,
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
