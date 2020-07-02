import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native'
import Text from '../../components/Text'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput, HelperText } from "react-native-paper";
import DefButton from '../../components/DefButton';
import { validateEmail } from '../../Utils/Utils';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default function ForgotPassword({ navigation }) {
    const [isReset, setIsReset] = useState(false)
    const [email, setEmail] = useState("");
    const [errorMessage1, setErrorMessage1] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (email) => {
        const error1 = validateEmail(email) ? "" : "*Invalid Email";
        setErrorMessage1(error1)
        if (error1 != "") {
            return
        }
        setIsLoading(true)
        fetch("http://3.23.32.212/api/forgot_password.php", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        }).then(res => res.json())
            .then(async (response) => {
                if (response['error'] == true) {
                    setErrorMessage1(response['message'])

                } else {
                    if (response['message'] == "email already verified") {
                        //setIsReset(true)

                        navigation.navigate('ChangePassword', { 'email': email, 'from': 'login' })
                    } else if (response['message'] == "email already sent") {
                        alert('Please Check your email')
                        setIsReset(true)
                    } else {
                        setIsReset(true)
                    }
                }
                setIsLoading(false)
            }).catch(error => {
                alert(error)
            });

    }

    return (
        <View style={styles.wrapper}>

            <SafeAreaView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text color='black' size={20}>Back</Text>
                </TouchableOpacity>
                {!isReset ?
                    <View>
                        <View style={styles.titleView}>
                            <Text color='black' size={25} style={{ fontWeight: 'bold' }}>Reset Password</Text>
                            <Text color='black' size={18} style={{ marginTop: 15, textAlign: 'center' }}>Enter your email. We'll send you a link to reset your password</Text>
                        </View>
                        <View style={styles.formView}>
                            <TextInput
                                style={styles.input}
                                label='Email'
                                theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                                value={email}
                                underlineColor="black"
                                onChangeText={(value) => setEmail(value)}
                            />
                            <HelperText
                                style={styles.error}
                                type="error"
                                visible={errorMessage1}
                            >
                                {errorMessage1}
                            </HelperText>

                        </View>
                        <View style={styles.buttonView}>
                            <DefButton text='RESET PASSWORD' onPress={() => { resetPassword(email) }}></DefButton>
                        </View>
                        <View style={styles.view3}>
                            <Text color="black">{"Remember password? "}</Text>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Text color="black" style={{ textDecorationLine: 'underline', }}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View>
                        <View style={styles.titleView}>
                            <Text color='black' size={25} style={{ fontWeight: 'bold' }}>Email Sent</Text>
                        </View>
                        <View style={styles.email}>
                            <Image source={require('../../assets/email2.png')}></Image>
                        </View>
                        <View style={styles.titleView}>
                            <Text color='black' size={18} style={{ marginTop: 15, textAlign: 'center' }}>Check your email for instruction to reset your password.</Text>
                        </View>
                        <View style={styles.formView}>
                            <DefButton text='RESET PASSWORD' onPress={() => { navigation.navigate('ChangePassword', { 'email': email }) }}></DefButton>
                        </View>
                    </View>
                }
            </SafeAreaView>
            {isLoading &&
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
        </View>
    )
}



const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 15
    },
    titleView: {
        alignItems: 'center',
        padding: 25
    },
    formView: {
        paddingHorizontal: 25
    },
    input: {
        marginBottom: 5,
        backgroundColor: 'transparent'
    },
    buttonView: {
        paddingHorizontal: 25,
    },
    email: {
        backgroundColor: '#33FFFF',
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view3: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    spinner: {
        backgroundColor: 'white',
        opacity: .5,
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },


});