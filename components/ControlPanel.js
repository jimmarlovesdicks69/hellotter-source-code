import React, { Fragment, useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const ControlPanel = (props) => {

    const styles = StyleSheet.create({
        view: {
            height: screenHeight * .10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#000000',
            position: 'absolute',
            paddingHorizontal: 20,
            bottom: 0
        },
    })

    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}><Image source={require('../assets/Favorite.png')} style={{width:30,height:30}}/></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contacts')}><Image source={require('../assets/Contacts.png')} style={{width:30,height:30}}/></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Call')}><Image source={require('../assets/Call.png')} style={{width:30,height:30}}/></TouchableOpacity>
                <TouchableOpacity onPress={() => props.onBackgroundPanelPressed()}><Image source={require('../assets/Image.png')} style={{width:30,height:30}}/></TouchableOpacity>
                <TouchableOpacity onPress={() => props.onFilterPanelPressed()}><Image source={require('../assets/Stickers.png')} style={{width:30,height:30}}/></TouchableOpacity>
                <TouchableOpacity><Image source={require('../assets/Gift.png')} style={{width:30,height:30}}/></TouchableOpacity>
            </View>
        </SafeAreaView>
    )


}

export default ControlPanel
