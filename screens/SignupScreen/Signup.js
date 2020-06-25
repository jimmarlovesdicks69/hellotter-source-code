import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Dimensions, Image, Platform, ActivityIndicator,ToastAndroid } from 'react-native';
import { TextInput, HelperText } from "react-native-paper";
import { validateEmail,setNameFirstLetterCapital } from '../../Utils/Utils';
import * as firebase from 'firebase';
import { ScrollView } from "react-native-gesture-handler";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Text from '../../components/Text';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default function Signup({ navigation }) {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [errorMessage1, setErrorMessage1] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [errorMessage3, setErrorMessage3] = useState("");
    const [errorMessage4, setErrorMessage4] = useState("");

    

    useEffect(() => {

    })

    const signUp = (email, password, fullname, confirmPassword) => {
        const error1 = fullname.length > 6 ? "" : "Fullname must up to 6 characters";
        const error2 = validateEmail(email) ? "" : "Invalid Email";
        const error3 = password.length > 6 ? "" : "Password must up to 6 characters";
        const error4 = password == confirmPassword ? "" : "Password doesn't match";

        setErrorMessage1(error1)
        setErrorMessage2(error2)
        setErrorMessage3(error3)
        setErrorMessage4(error4)

        if (!error1 && !error2 && !error3 && !error4) {
            setisLoading(true)
            fetch("http://3.23.32.212/api/signup.php", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname: setNameFirstLetterCapital(fullname),
                    email: email.toLowerCase(),
                    password: password,
                    contact_number: '0',
                })
            }).then(res => res.json())
                .then(response => {
                    setisLoading(false)
                    if (response['error'] == true) {
                        setErrorMessage2(response['message'])
                    } else {
                        showToast()
                        navigation.goBack()
                    }


                }).catch(error => {
                    alert(error)
                });
        }
    };

    const showToast = () => {
        ToastAndroid.show("Signup Succesfull!", ToastAndroid.SHORT);
    };
    return (

        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll
            extraScrollHeight={10}
            enableOnAndroid={true}
            extraHeight={Platform.select({ android: 100 })}
            style={styles.scroll}
        >
            <ImageBackground
                source={require("../../assets/background.png")}
                style={styles.image}
            >

                <View>
                    <Image style={styles.icon} source={require('../../assets/Hellotter-logo-white.png')} />
                    <TextInput
                        style={styles.input}
                        label="Fullname"
                        value={fullname}
                        underlineColor="#fff"
                        onChangeText={(value) => setFullName(value)}
                    />
                    <HelperText
                        type="error"
                        visible={errorMessage1.length != ""}
                    >
                        {errorMessage1}
                    </HelperText>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        value={email}
                        underlineColor="#fff"
                        onChangeText={(value) => setEmail(value)}
                    />
                    <HelperText
                        type="error"
                        visible={errorMessage2.length != ""}
                    >
                        {errorMessage2}
                    </HelperText>
                    <TextInput
                        style={styles.input}
                        label="Password"
                        value={password}
                        underlineColor="#fff"
                        secureTextEntry
                        onChangeText={(value) => setPassword(value)}
                    />
                    <HelperText
                        type="error"
                        visible={errorMessage3.length != ""}
                    >
                        {errorMessage3}
                    </HelperText>
                    <TextInput
                        style={styles.input}
                        label="Confirm Password"
                        value={confirmPassword}
                        underlineColor="#fff"
                        secureTextEntry
                        onChangeText={(value) => setConfirmPassword(value)}
                    />
                    <HelperText
                        type="error"
                        visible={errorMessage4.length != ""}
                    >
                        {errorMessage4}
                    </HelperText>
                    <Text style={styles.agreement}>
                        By Clicking "Sign Up", I agree to the terms and conditions of hellotter
                        </Text>
                    <TouchableOpacity
                        style={styles.submitButton}
                        // disabled={!formValid}
                        onPress={() => signUp(email, password, fullname, confirmPassword)}
                    >
                        <Text style={styles.submitButtonText}> SIGN UP </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.view2}>
                    <View style={styles.view3}>
                        <Text size={15} color="white">
                            {"Already a Member? "}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text color="white" size={15} style={styles.login}>
                                Sign in
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.version}>
                        V1.0.1
                        </Text>
                </View>

                {isLoading &&
                    <View style={styles.spinner}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }

            </ImageBackground>
        </KeyboardAwareScrollView>



    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: screenHeight,
        flexDirection: 'column'
    },
    scroll: {
        flexGrow: 1,

    },
    image: {
        flex: 1,
        height: screenHeight,
        resizeMode: "cover",
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "transparent",
        alignSelf: "stretch",
    },
    icon: {
        marginTop: 10,
        marginBottom: 40,
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    error: {
        marginBottom: 5,
    },
    submitButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
    },
    submitButton: {
        backgroundColor: "#FC5757",
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 3,
    },
    view2: {
        alignItems: 'center'
    },
    agreement: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    version: {
        color: 'white'
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
    login: {
        color: 'white',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    view3: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});