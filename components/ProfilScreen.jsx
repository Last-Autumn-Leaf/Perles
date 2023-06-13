import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { commonStyles } from '../styles';
import { initializeApp } from 'firebase/app';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import {activitiesOriginal} from "../setupconst";

// Initialize Firebase
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

const ParcourirScreen = () => {
  const [name, setName] = useState('Guest');
  const [ppUri, setPpUri] = useState(null);

  useEffect(() => {
    const ref_name = database().ref('/User/name').on('value', snapshot => {
      setName(snapshot.val());
    });

    const ref_pp_uri = storage()
      .ref('/images/userspp/pp1.jpg')
      .getDownloadURL()
      .then(url => {
        setPpUri(url);
      })
      .catch(error => {
        console.log('Error getting download URL:', error);
      });
  }, []);


  const addDocumentToFirestore = async () => {
    
    for (const activity of activitiesOriginal) {
      try {
        await setDoc(doc(db, "activities", activity.id.toString().padStart(3, '0')), {
          title: activity.data.title,
          cities: activity.data.cities,
          categories: activity.data.categories,
          description: activity.data.description
        });
        console.log(`Document added for activity with ID: ${activity.id}`);
      } catch (error) {
        console.error(`Error adding document for activity with ID: ${activity.id}`, error);
      }
    }
    
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
      {ppUri && (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: 'hidden',
            borderWidth: 2,
          }}
        >
          <Image
            source={{ uri: ppUri }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
      )}
      <Text>Username: {name}</Text>
      <Button title="Add Document" onPress={addDocumentToFirestore} />
    </ScrollView>
  );
};

export default ParcourirScreen;
