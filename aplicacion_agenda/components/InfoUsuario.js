import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

const InfoUsuario = ({ user, rol }) => {
  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.itemContainer}>
      
        {rol === "estudiante" ? (
          <View style={styles.infoContainer}>
          <Image source={{ uri: `https://example.com/images`}} style={styles.profileImage} />
            <Text style={styles.name}>{user.nombre} {user.apellido}</Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Correo electrónico:</Text> {user.correo}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Teléfono:</Text> {user.telefono}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Dirección:</Text> {user.direccion}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Fecha de nacimiento:</Text> {formatDate(user.fecha_nacimiento)}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Carnet:</Text> {user.carnet}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Género:</Text> {user.genero}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>ID Curso:</Text> {user.id_curso}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>ID Padre:</Text> {user.id_padre}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Alergias:</Text> {user.alergias ? user.alergias.join(', ') : ''}
            </Text>
            </View>
        ):(
            <>
                
            </>
        )}
      
    </View>
  );
};

const styles = StyleSheet.create({
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
        marginHorizontal:16,
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
});

export default InfoUsuario;
