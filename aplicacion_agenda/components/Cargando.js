import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Cargando = () => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            delay: delay,
          }),
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    blink(dot1, 0);
    blink(dot2, 200);
    blink(dot3, 400);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingDots}>
        <Text style={styles.loadingText}>Loading</Text>
        <Animated.Text style={[styles.dot, { opacity: dot1 }]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot2 }]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot3 }]}>.</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%', // Media pantalla
    position: 'relative',
  },
  loadingDots: {
    flexDirection: 'row',
    fontSize: 32,
  },
  loadingText: {
    fontSize: 32,
  },
  dot: {
    fontSize: 32,
    marginHorizontal: 2,
  },
});

export default Cargando;
