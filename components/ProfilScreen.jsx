import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { commonStyles } from '../styles';

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
    </ScrollView>
  );
};

export default ParcourirScreen;
