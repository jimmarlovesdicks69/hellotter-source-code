import React, { Fragment, useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from '@react-navigation/native';


const DefHeader = (props) => {
    const { colors } = useTheme();

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        view: {
            height: 60,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colors.primary
        },
        logo: {
            width: 55,
            height: 55,
            resizeMode: 'contain',
        }

    });


    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
                <Image source={require('../assets/End.png')} />
            </TouchableOpacity>
            <Image style={styles.logo} source={require('../assets/hellootter_singup.png')} />
            <TouchableOpacity onPress={() => {navigation.navigate('VideoCall')}}>
                <Image source={require('../assets/cameraplus.png')} />
            </TouchableOpacity>
        </View>
    )


}



export default DefHeader