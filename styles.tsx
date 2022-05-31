import { StyleSheet } from 'react-native';

const primary= "#EA3323";
const secondary= "#3E9F20";
const accent= "#FFDBC6";
const accent2= "#CDE6C5";
const grey= "#AEAEAE";
const white= "#FFFFFF";

const petsStyles = StyleSheet.create({
    view: {
      backgroundColor: white,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      color: primary,
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  })

const petStyles = StyleSheet.create({
  deleteButtonContainer: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  main: {
    height: 200,
    width: 200,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: accent,
    borderRadius: 30,
    marginTop: 25
  },
  deleteButton: {
    height: 30,
    width: 30
  },
  image: {
    marginTop: -10,
    height: 150,
    width: 150,
    alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    color: primary,
    alignSelf: 'center'
  },
  space: {
    height: 20,
  }
})
  
const navStyles = StyleSheet.create({
  tabNavigator: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: accent,
    borderRadius: 45,
    height: 90
  },
  tabScreen: {
    width: 70,
    height: 70,
  },
})

export {petsStyles, navStyles, petStyles};