import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Text from './Text'
import * as Animatable from 'react-native-animatable';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const LogoutConfirmation = (props) => {
    return (
        <View style={styles.view}>
            <Animatable.View animation="fadeInUp" style={styles.confirmationView}>
                <Text color="black" size={30} style={{ fontWeight: 'bold' }}>Logout</Text>
                <Text color="grey" size={20}>Are you sure you want to logout?</Text>
                <View>
                    <TouchableOpacity
                        style={{backgroundColor: "#FC5757", padding: 10,height: 40,borderRadius: 3,width:screenWidth*.8 }}
                        onPress={() => props.onPressLogout()}>
                        <Text style={{color: "#FFFFFF",textAlign: "center",fontWeight: 'bold'}}>
                            LOGOUT
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{backgroundColor: "#E8E8E8", padding: 10,height: 40,marginTop:5,borderRadius: 3,width:screenWidth*.8 }}
                        onPress={() => props.onPressCancel()}>
                        <Text style={{color: "black",textAlign: "center",fontWeight: 'bold'}}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex:1,
        width: screenWidth,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmationView: {
        width: screenWidth * .9,
        height: screenHeight * .4,
        backgroundColor: 'white',
        resizeMode: 'contain',
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom:20,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});


export default LogoutConfirmation;