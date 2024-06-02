import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const roles = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creando futuros brillantes</Text>
      <View style={styles.cardContainer}>

      <Pressable style={styles.card} onPress={() => router.replace("/(authenticate)/loginProfesor")}>
          <Image source={require('../../assets/images/profesor.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Soy un padre de familia</Text>
        </Pressable>
        <Pressable style={styles.card} onPress={() => router.replace("/(authenticate)/loginPadre")}>
          <Image source={require('../../assets/images/padre.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Soy un padre de familia</Text>
        </Pressable>
        <Pressable style={styles.card} onPress={() => router.replace("/(authenticate)/loginEstudiante")}>
          <Image source={require('../../assets/images/estudiante.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Soy un estudiante</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    padding: 10,
    marginBottom:'30px',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default roles;