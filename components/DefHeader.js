import React, { Fragment, useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";
import Text from './Text'

import { useNavigation } from '@react-navigation/native';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const DefHeader = (props) => {
    const { colors } = useTheme();

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        view: {
            height: screenHeight*.09,
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
        <SafeAreaView style={{backgroundColor:'#33FFFF'}}>
        <View style={styles.view}>
            {props.isBack ?
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text size={17} color='black'>Back</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                    <Image source={require('../assets/End.png')} />
                </TouchableOpacity>
            }
            <Image style={styles.logo} source={require('../assets/hellootter_singup.png')} />
            <TouchableOpacity onPress={() => {navigation.navigate('VideoCall')}}>
                <Image style={{marginLeft:props.isBack?7:0}} source={require('../assets/cameraplus.png')} />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )


}



export default DefHeader