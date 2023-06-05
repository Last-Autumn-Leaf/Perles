import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { SPLASHSCREEN_PARCOURIR } from '../constants';
import { commonStyles } from '../styles';
import SplashScreen from './SplashScreens';

const ParcourirScreen = () => {
  const [name, setName] = useState('Guest');
  const [splashUri, setSplashUri] = useState(null);

  useEffect(() => {
    const ref = database().ref('/User/name');
    ref.on('value', snapshot => {
      console.log('User data:', snapshot.val());
      setName(snapshot.val());
    });

    const fetchSplashUri = async () => {
      try {
        const uri = await storage().ref(SPLASHSCREEN_PARCOURIR).getDownloadURL();
        setSplashUri(uri);
      } catch (error) {
        console.log('Error fetching splash image:', error);
        // Handle the error appropriately
      }
    };

    fetchSplashUri();
  }, []);

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
      {splashUri && <SplashScreen uri={splashUri} text="Parcourir" />}

      <View style={commonStyles.container}>
        <Text>Parcourir Screen: {name}</Text>
      </View>
    </ScrollView>
  );
};

export default ParcourirScreen;
