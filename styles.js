import { StyleSheet } from 'react-native';


export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
});

export const screenSearchStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f1f1f1',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  filterIcon: {
    color: 'grey',
    fontSize: 20,
  },

  
  modalContainer: {
    flex: 1,
    margin:20,
  },
  closeContainer:{
    flexDirection:'row',
    alignItems: 'center'
  },
  closeIcon:{
    color : 'grey',
    fontSize:20,
    marginRight:10
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterTitles:{
    fontWeight:'bold',
    marginTop:20,
    justifyContent:'flex-start',
  },
  filtersubTitles:{
    marginTop:20,
  },
  filterContainer:{ // this might be only used one time pleas check when finished
    marginLeft:10,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent:'space-between'
  },
  checkboxLabel: {
    fontSize: 12,
    justifyContent:'flex-start',
  },
  checkbox: {
    marginRight: 10,
  },

  priceContainer:{
    flexDirection:'row',
    display: 'flex',
    justifyContent: 'center',
  },
  priceIconContainer: {
    padding: 5,
    margin:10,
    width:80,
    borderRadius: 5,
    backgroundColor: '#ccc',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceActiveIcon: {
    backgroundColor: 'blue',
  },
  priceIcon: {
    fontSize: 16,
    color: 'white',
  },

  ratingContainer: {
    flexDirection:'row',
    display: 'flex',
    justifyContent: 'center',
  },
  ratingIconContainer:{
    padding: 5,
    margin:5,
    width:30,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingActiveIcon: {
    color: 'red',
  },
  ratingIcon: {
    fontSize: 20,
    color: 'black',
  },
});
