import { StyleSheet } from 'react-native';

const primary= "#EA3323";
const secondary= "#3E9F20";
const accent= "#FFDBC6";
const accent2= "#CDE6C5";
const grey= "#AEAEAE";
const white= "#FFFFFF";

const petsStyles = StyleSheet.create({
    view: {
      display: "flex",
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      color: "red",
      fontSize: 40,
      fontWeight: 'bold',
    },
  })
  
const navStyles = StyleSheet.create({
  tabNavigator: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: 'grey',
    borderRadius: 10,
    height: 90
  },
  tabScreen: {
    width: 70,
    height: 70,
  },
})

export {petsStyles, navStyles};