import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, Picker, TextInput } from 'react-native'
import DefHeader from '../../components/DefHeader';
import Text from '../../components/Text'
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
//import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
// import { ScrollView } from 'react-native-gesture-handler';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default function AddCoins() {
    const { userInfo } = useContext(UserInfoContext)

    const [pickerVisible, setPickerVisible] = useState(false)
    const [cardType, setCardType] = useState('Visa')

    var cardTypes = ['Visa', 'Mastercard', 'Paypal']
    return (

        <View style={styles.wrapper}>

            <DefHeader isBack={true} />
            <ScrollView style={{ flex: 1, height: screenHeight }}>
                <View style={styles.title}>
                    <Text color="black" size={30}>Card Management</Text>
                </View>
                <View style={styles.cardType}>
                    <Text color="black" size={17}>Card Type:</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', borderBottomWidth: .5 }}
                        onPress={() => setPickerVisible(true)}>
                        <Image source={require('../../assets/visa.png')} style={{ marginRight: 5 }} />
                        <Text color="black" size={17} style={{ marginRight: 15 }}>{cardType}</Text>
                        {/* <MaterialIcons name="keyboard-arrow-down" size={20} /> */}
                    </TouchableOpacity>

                </View>
                <View style={styles.subTitle}>
                    <Text color="black" size={20}>Account Number</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            autoCorrect={false}
                            placeholder="Card Number"
                        // value={this.state.password}
                        // onChangeText={this.onPasswordEntry}
                        />
                    </View>
                    <View style={styles.cvvContainer}>
                        <Text color="grey" size={15} style={{ marginRight: 10 }}>CVV</Text>
                        <TextInput
                            style={styles.inputStyle}
                            autoCorrect={false}
                        // value={this.state.password}
                        // onChangeText={this.onPasswordEntry}
                        />
                    </View>
                </View>
                <View style={styles.subTitle}>
                    <Text color="black" size={20}>Expiration Date</Text>
                </View>
                <View style={styles.content2}>
                    <View style={styles.expContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            autoCorrect={false}
                            placeholder="mm"
                        // value={this.state.password}
                        // onChangeText={this.onPasswordEntry}
                        />
                        {/* <MaterialIcons name="keyboard-arrow-down" size={20} /> */}
                    </View>
                    <View style={styles.expContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            autoCorrect={false}
                            placeholder="yyyy"
                        // value={this.state.password}
                        // onChangeText={this.onPasswordEntry}
                        />
                        {/* <MaterialIcons name="keyboard-arrow-down" size={20} /> */}
                    </View>
                </View>
                <View style={styles.subTitle}>
                    <Text color="black" size={20}>Billing Address</Text>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.billingContent}>
                        <Text color='grey' size={17} style={{ width: 100 }}>Name</Text>
                        <Text color='black' size={17} style={{ width: 100 }}>{userInfo.fullname}</Text>
                    </View>
                    <View style={styles.billingContent}>
                        <Text color='grey' size={17} style={{ width: 100 }}>Address</Text>
                        <Text color='black' size={17} style={{ width: 100 }}>{userInfo.address}</Text>
                    </View>
                    <View style={styles.billingContent}>
                        <Text color='grey' size={17} style={{ width: 100 }}>City</Text>
                        <Text color='black' size={17} style={{ width: 100 }}>{userInfo.address}</Text>
                    </View>
                    <View style={styles.billingContent}>
                        <Text color='grey' size={17} style={{ width: 100 }}>Zip</Text>
                        <Text color='black' size={17} style={{ width: 100 }}>{userInfo.address}</Text>
                    </View>
                    <View style={styles.billingContent}>
                        <Text color='grey' size={17} style={{ width: 100 }}>Phone</Text>
                        <Text color='black' size={17} style={{ width: 100 }}>{userInfo.phone_number}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#2B81FF",
                        padding: 10,
                        margin: 15,
                        height: 40,
                        borderRadius: 3,
                    }}
                    onPress={() => { }}>
                    <Text style={{ color: "#FFFFFF", textAlign: "center", fontWeight: 'bold' }}>
                        Done
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {pickerVisible &&
                <View style={styles.pickerContainer} onTouchStart={() => setPickerVisible(false)}>
                </View>
            }
            {pickerVisible &&
                <Animatable.View animation="slideInUp" duration={500} style={styles.picker}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../assets/visa.png')} style={{ marginRight: 20 }} />
                        <Text color='black' size={25}>Visa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../assets/visa.png')} style={{ marginRight: 20 }} />
                        <Text color='black' size={25}>Visa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../assets/visa.png')} style={{ marginRight: 20 }} />
                        <Text color='black' size={25}>Visa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../assets/visa.png')} style={{ marginRight: 20 }} />
                        <Text color='black' size={25}>Visa</Text>
                    </TouchableOpacity>
                </Animatable.View>

            }
        </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: screenHeight
    },
    title: {
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: 'center'
    },
    cardType: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
        flexDirection: 'row'
    },
    subTitle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#E6E6E6'
    },
    wallet: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 200,
        borderColor: '#2E84FF'
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content2: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        height: 70,
        flexDirection: 'row',
    },
    billingContent: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    pickerContainer: {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    pickerWrapper: {
        justifyContent: 'space-between'
    },
    picker: {
        top: screenHeight * .3,
        position: 'absolute',
        backgroundColor: 'white',
        width: screenWidth * .7,
        height: screenHeight * .4,
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',

    },
    InputContainer: {
        flexDirection: 'row',
        borderBottomWidth: .5,
        borderColor: '#000',
        alignItems: 'center',
        paddingBottom: 5,
        width: screenWidth * .6
    },
    cvvContainer: {
        flexDirection: 'row',
        borderBottomWidth: .5,
        borderColor: '#000',
        alignItems: 'center',
        paddingBottom: 5,
        width: screenWidth * .25,
    },
    expContainer: {
        flexDirection: 'row',
        borderBottomWidth: .5,
        borderColor: '#000',
        alignItems: 'center',
        paddingBottom: 5,
        marginRight:15,
        width: screenWidth * .25,
    },
    inputStyle: {
        flex: 1,
        fontSize:18
    },
});