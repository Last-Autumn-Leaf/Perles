import React, { useEffect, useState } from 'react';
import { View, ScrollView ,Text, Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import SplashScreen from './SplashScreens';
import { SPLASHSCREEN_AVIS } from '../constants';
import { commonStyles } from '../styles';

import { collection, getDocs,doc, setDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9zBWgJICabe2LYHI623w43F7ZqLFI5ZY",
  authDomain: "perles-a7578.firebaseapp.com",
  databaseURL: "https://perles-a7578-default-rtdb.firebaseio.com",
  projectId: "perles-a7578",
  storageBucket: "perles-a7578.appspot.com",
  messagingSenderId: "626765239576",
  appId: "1:626765239576:web:8a4723ef3b7abd75bfba6d",
  measurementId: "G-YP3553QVSY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function AvisScreen() {
  const [splashUri, setSplashUri] = useState(null);
  const [activitiesData, setActivitiesData] = useState([]);

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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'activities'));
        const activities = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          activities.push(data);
        });
        console.log(activities);
        setActivitiesData(activities);
      } catch (error) {
        console.log('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
      {splashUri && <SplashScreen uri={splashUri} text="Avis" />}
      <View style={commonStyles.container}>
      {activitiesData.map((activity) => (
          <View key={activity.id} style={commonStyles.activityContainer}>
            <View style={commonStyles.titleContainer}>
              <Text style={commonStyles.title}>{activity.title}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View
                style={{
                  width: 150,
                  height: 100,
                  borderRadius: 25,
                  overflow: 'hidden',
                  borderWidth: 1,
                }}
              >
                <Image
                  source={{ uri: null }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <View style={commonStyles.detailsContainer}>
                <View style={commonStyles.infoContainer}>
                  <Text style={commonStyles.infoLabel}>Villes:</Text>
                  <Text style={commonStyles.infoText}>{activity.cities.join(", ")}</Text>
                </View>
                <View style={commonStyles.infoContainer}>
                  <Text style={commonStyles.infoLabel}>Catégories:</Text>
                  <Text style={commonStyles.infoText}>{activity.categories.join(", ")}</Text>
                </View>
              </View>
            </View>
            <Text style={commonStyles.description}>{activity.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default AvisScreen;