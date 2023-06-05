import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = ({ uri, text }) => {
  return (
    <ImageBackground
      source={{ uri }}
      style={styles.imageBackground}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    minHeight:150,
    width:'100%'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
