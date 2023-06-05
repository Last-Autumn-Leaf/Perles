import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ParcourirScreen from './components/ParcourirScreen';
import RechercheScreen from './components/RechercheScreen';
import AvisScreen from './components/AvisScreen';
import PlanScreen from './components/PlanScreen';
import ProfilScreen from './components/ProfilScreen';
import { SafeAreaView } from 'react-native';


const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconComponent;
              if (route.name === 'Parcourir') {
                  iconComponent = (<Icon name="compass" size={size} color={color} /> );
              } else if (route.name === 'Recherche') {
                iconComponent = (<Icon name="search" size={size} color={color} /> );
              } else if (route.name === 'Avis') {
                  iconComponent = (<Icon name="star" size={size} color={color} /> );
              } else if (route.name === 'Planning') {
                iconComponent = (<Icon name="calendar" size={size} color={color} /> );
              } else if (route.name === 'Profil') {
                iconComponent = (<Icon name="user-circle-o" size={size} color={color} /> );
              } 
              return iconComponent;
            },
            tabBarActiveTintColor:"blue",
            tabBarInactiveTintColor:"grey",
            tabBarStyle:{"display":"flex"},
            headerShown: false,
          })}
        >
          <Tab.Screen name="Parcourir" component={ParcourirScreen} />
          <Tab.Screen name="Recherche" component={RechercheScreen} />
          <Tab.Screen name="Profil" component={ProfilScreen} />
          <Tab.Screen name="Avis" component={AvisScreen} />
          <Tab.Screen name="Planning" component={PlanScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
