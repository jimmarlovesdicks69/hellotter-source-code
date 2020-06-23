import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image,ActivityIndicator } from 'react-native'
import Text from '../../components/Text'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput, HelperText } from "react-native-paper";
import DefButton from '../../components/DefButton';

export default function ChangePassword({ route,navigation }) {
    const { email } = route.params;

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage1, setErrorMessage1] = useState('')
    const [errorMessage2, setErrorMessage2] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isReset, setIsReset] = useState(false)

    useEffect(() => {
        console.log(email)
    }, [])

    const updatePassword = (password, confirmPassword) => {
        const error1 = password.length >= 6 ? "" : "*Password must up to 6 characters";
        const error2 = confirmPassword == password ? "" : "*Password does not match"

        setErrorMessage1(error1)
        setErrorMessage2(error2)
        if (error1 != "" || error2 !=""){
            return
        }
        setIsLoading(true)
        fetch("http://3.23.32.212/api/update_password.php", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        }).then(res => res.json())
            .then(async (response) => {
                if (response['error'] == true) {
                    setErrorMessage2(response['message'])
                } else {
                    setIsReset(true)
                }
                setIsLoading(false)
            }).catch(error => {
                alert(error)
            });
    }

    return (
        <View styles={styles.wrapper}>

            {!isReset ?
                <View>
                    <View style={styles.titleView}>
                        <Text color='black' size={25} style={{ fontWeight: 'bold' }}>Change Password</Text>
                        <Text color='black' size={18} style={{ marginTop: 15, textAlign: 'center' }}>Set your new password.</Text>
                    </View>
                    <View style={styles.formView}>
                        <TextInput
                            style={styles.input}
                            label='Password'
                            secureTextEntry
                            theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                            value={password}
                            underlineColor="black"
                            onChangeText={(value) => setPassword(value)}
                        />
                        <HelperText
                            style={styles.error}
                            type="error"
                            visible={errorMessage1}
                        >
                            {errorMessage1}
                        </HelperText>
                        <TextInput
                            style={styles.input}
                            label='Confirm Password'
                            theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                            secureTextEntry
                            value={confirmPassword}
                            underlineColor="black"
                            onChangeText={(value) => setConfirmPassword(value)}
                        />
                        <HelperText
                            style={styles.error}
                            type="error"
                            visible={errorMessage2}
                        >
                            {errorMessage2}
                        </HelperText>
                    </View>
                    <View style={styles.buttonView}>
                        <DefButton text='UPDATE PASSWORD' onPress={() => updatePassword(password, confirmPassword)}></DefButton>
                    </View>
                </View>
                :
                <View>
                    <View style={styles.titleView}>
                        <Text color='black' size={25} style={{ fontWeight: 'bold' }}>Password Updated</Text>
                    </View>
                    <View style={styles.email}>
                        <Image source={require('../../assets/check-symbol.png')}></Image>
                    </View>
                    <View style={styles.titleView}>
                        <Text color='black' size={18} style={{ marginTop: 15, textAlign: 'center' }}>Success! Login again for access.</Text>
                    </View>
                    <View style={styles.formView}>
                        <DefButton text='LOGIN' onPress={() => navigation.navigate('Login')}></DefButton>
                    </View>
                </View>
            }
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
        paddingTop: 15
    },
    titleView: {
        alignItems: 'center',
        padding: 25
    },
    formView: {
        paddingHorizontal: 40
    },
    input: {
        marginBottom: 5,
        backgroundColor: 'transparent',
        color: 'black',

    },
    buttonView: {
        marginTop: 20,
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
    error: {
        color: 'red'
    }
});