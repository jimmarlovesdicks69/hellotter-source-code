import React, { Fragment, useState, useEffect } from "react";
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ControlPanel = (props) => {

    const styles = StyleSheet.create({
        view: {
            height: 60,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: '#000000',
            position:'absolute',
            bottom:0
        },
    })

    const navigation = useNavigation();
    return (
        <View style={styles.view}>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}><Image source={require('../assets/Favorite.png')} /></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contacts')}><Image source={require('../assets/Contacts.png')} /></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Call')}><Image source={require('../assets/Call.png')} /></TouchableOpacity>
                <TouchableOpacity><Image source={require('../assets/Image.png')} /></TouchableOpacity>
                <TouchableOpacity onPress={() => props.onFilterPanelPressed()}><Image source={require('../assets/Stickers.png')} /></TouchableOpacity>
                <TouchableOpacity><Image source={require('../assets/Gift.png')} /></TouchableOpacity>
            </View>
        </View>
    )

    
}

export default ControlPanel
