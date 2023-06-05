import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import storage from '@react-native-firebase/storage';
import SplashScreen from './SplashScreens';
import { SPLASHSCREEN_AVIS } from '../constants';
import { commonStyles } from '../styles';





function AvisScreen() {
  const [splashUri, setSplashUri] = useState(null);

  useEffect(() => {
    const fetchSplashUri = async () => {
      try {
        const url = await storage().ref(SPLASHSCREEN_AVIS).getDownloadURL();
        setSplashUri(url);
      } catch (error) {
        console.log('Error fetching splash image:', error);
      }
    };
    fetchSplashUri();
  }, []);

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
      {splashUri && <SplashScreen uri={splashUri} text="Avis" />}

      <View style={commonStyles.container}>
        {/* Rest of the content */}
      </View>
    </ScrollView>
  );
}

export default AvisScreen;
