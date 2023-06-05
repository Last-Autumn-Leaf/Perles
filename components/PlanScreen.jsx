import React, { useEffect, useState } from 'react';
import { View,ScrollView, Text } from 'react-native';
import storage from '@react-native-firebase/storage';
import { SPLASHSCREEN_PLAN } from '../constants';
import SplashScreen from './SplashScreens';
import { commonStyles } from '../styles';

function PlanScreen() {
  const [splashUri, setSplashUri] = useState(null);

  useEffect(() => {
    const fetchSplashUri = async () => {
      try {
        const url = await storage().ref(SPLASHSCREEN_PLAN).getDownloadURL();
        setSplashUri(url);
      } catch (error) {
        console.log('Error fetching splash image:', error);
      }
    };
    fetchSplashUri();
  }, []);


  return (
    <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
      {splashUri && <SplashScreen uri={splashUri} text="Planning" />}

      <View style={commonStyles.container}>
        {/* Rest of the content */}
      </View>
    </ScrollView>
  );
}

export default PlanScreen;
