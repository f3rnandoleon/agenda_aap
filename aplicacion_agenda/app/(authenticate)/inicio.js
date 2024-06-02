import React from "react";
import { StyleSheet, Text, View, Pressable,Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


const inicio = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        style={styles.topBorder}
        source={require("../../assets/images/Subtract.png")}
      />
      <Text style={styles.welcomeText}>BIENVENIDO</Text>
      <Text style={styles.agendaText}>Agenda Digital</Text>
      <View style={styles.characterContainer}>
        <Image
          source={require('../../assets/images/logoo.png')}
          style={styles.characterImage}
        />
      </View>
      <Pressable style={styles.continueButton} onPress={() => router.replace("/(authenticate)/roles")}>
        <Text style={styles.continueButtonText}>Presione para continuar</Text>
      </Pressable>
      <Image
        style={styles.bottomBorder}
        source={require("../../assets/images/Subtract1.png")}
      />
      
    </View>
  );
};

export default inicio;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  agendaText: {
    fontSize: 25,
    marginBottom: 30,
  },
  characterContainer: {
    alignItems: 'center',
  },
  characterImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  continueButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 10,
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10,
  },
});
