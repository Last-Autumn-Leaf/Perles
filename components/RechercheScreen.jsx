import React, { useState } from 'react';
import { View, TextInput, Modal, TouchableOpacity, Text, ScrollView, Alert, Platform } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import MapView from 'react-native-maps';
import * as constants from "../constants";
import { screenSearchStyles as styles } from "../styles";




const RechercheScreen = () => { 

  const [isModalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState([...constants.FILTER_LIST_ACTIVITY]);
  const [priceIcons, setPriceIcons] = useState(Array(constants.PRICE_SIZE).fill({ name: 'euro', active: true }));
  const [ratingtIcons, setRatingIcons] = useState(Array(constants.RATING_SIZE).fill({ name: 'heart', active: true }));
  const [distance, setDistance] = useState(1);

  const toggleModal = () => { 
    if (filters.length ===0 ){
      Alert.alert('Aucune activité sélectionnée', 'Veuillez sélectionner au moins une.');
    }else{ 
      setModalVisible(!isModalVisible);
    }
   };

  const handleFilterToggle = (filter) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  const handlePriceIconClick = (index) => {
    setPriceIcons((prevIcons) =>
      prevIcons.map((icon, i) => ({
        ...icon,
        active: i === index ? !icon.active : icon.active,
      }))
    );
  };
  const handleRatingIconClick = (index) => {
    setRatingIcons((prevIcons) =>
      prevIcons.map((icon, i) => ({
        ...icon,
        active: i <= index ,
      }))
    );
  };
  const handleDistanceChange = (value) => {
    setDistance(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Où allons-nous ?"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={toggleModal}>
          <Icon 
            name="filter" 
            style={styles.filterIcon} 
          />
        </TouchableOpacity>
      </View>
      {Platform.OS !== 'web' && (
        <MapView
          style={styles.map}
          initialRegion={constants.MARTINIQUE_LOCATION}
        />
      )}

      <Modal 
        visible={isModalVisible} 
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeContainer}>
            <Icon 
              name="chevron-left" 
              style={styles.closeIcon} 
            />
            <Text style={styles.closeButton}>Retour</Text>
          </TouchableOpacity>
          <ScrollView>


            <Text style={styles.filterTitles}>Activités</Text>
            {constants.FILTER_LIST_ACTIVITY.map((filter, index) => (
              <View key={`filter_activity_list_${index}`} style={[styles.filterContainer,styles.checkboxContainer]}>
                <Text style={styles.checkboxLabel}>{filter}</Text>
                {/* <Checkbox
                  style={styles.checkbox}
                  value={filters.includes(filter)}
                  onValueChange={() => handleFilterToggle(filter)}
                /> */}
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  isChecked={filters.includes(filter)}
                  disableText={true}
                  text={filter}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={(isChecked) => handleFilterToggle(filter)}
                />
              </View>
            ))}


            <Text style={styles.filterTitles}>Prix</Text>
            <View style={styles.priceContainer}>
            {priceIcons.map((icon, index) => (
              <TouchableOpacity
                key={`filter_price_${index}`}
                style={[styles.priceIconContainer, icon.active && styles.priceActiveIcon]}
                onPress={() => handlePriceIconClick(index)}
              >
                {Array.from({ length: index + 1 }, (_, i) => (
                  <Icon key={`filter_price_icon_${i}`} name={icon.name} style={styles.priceIcon} />
                ))}
              </TouchableOpacity>
            ))}
            </View>


            <Text style={styles.filterTitles}>Avis</Text>
            <View style={styles.ratingContainer}>
              {ratingtIcons.map((icon, index) => (
                <TouchableOpacity
                  key={`filter_rating_${index}`}
                  style={[styles.ratingIconContainer,]}
                  onPress={() => handleRatingIconClick(index)}
                >
                  <Icon 
                    key={`filter_rating_icon_${index}`} 
                    name={icon.name} 
                    style={[styles.ratingIcon ,icon.active && styles.ratingActiveIcon]} 
                  />
                </TouchableOpacity>
              ))}
            </View>


            <View style={styles.checkboxContainer}>
              <Text style={styles.filterTitles}>Distance</Text>
              <Text style={styles.filtersubTitles}>{distance} km</Text>
            </View>
            <Slider
              minimumValue={1}
              maximumValue={80}
              value={distance}
              step={1}
              onValueChange={handleDistanceChange}
            />

          </ScrollView>
          

        </View>
      </Modal>
    </View>
  );
};



export default RechercheScreen;
