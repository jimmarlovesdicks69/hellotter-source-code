import React, { Fragment } from "react";
import { StyleSheet, Image, View } from 'react-native';

export default function Splash({ navigation }) {
  setTimeout(() => {
    navigation.navigate('Authentication')
  },1000);
  return (
    <Fragment>
      <View style={styles.wrapper}>
        <Image source={require("../../assets/icon.png")} 
        style={styles.logo} />
      </View>
    </Fragment>
    
  );
};

const styles = StyleSheet.create({
  wrapper: {
   display: "flex",
   flex:1,
   alignItems: "center",
   justifyContent: "center"
  },
 
  logo: {
   width: 300,
   height: 300,
 },
 
 });