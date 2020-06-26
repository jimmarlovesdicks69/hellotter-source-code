import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Text from '../components/Text'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { AntDesign } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const screenHeight = Math.round(Dimensions.get('window').height);
const CustomDrawer = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.close}>
                <AntDesign name="close" size={35} color="black" />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NewProfile')}>
                <View style={styles.nav}>
                    <Image source={require('../assets/prof.png')} />
                    <Text color="black" size={17} style={styles.text}>
                        PROFILE
                </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <View style={styles.nav2}>
                    <Image source={require('../assets/Account.png')} />
                    <Text color="black" size={17} style={styles.text}>
                        ACCOUNT
                </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};


export default CustomDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: screenHeight * .1
    },
    nav: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderTopWidth: .5,
        borderBottomWidth: .5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nav2: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderBottomWidth: .5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10
    },
    close:{
        padding:15
    }
});