import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, AsyncStorage } from 'react-native';
import DefHeader from '../../components/DefHeader';
import Text from '../../components/Text'
import DefButton from '../../components/DefButton';
import ImportButton from '../../components/ImportButton';
//import * as Google from 'expo-google-app-auth';
import { sortContacts } from '../../Utils/Utils';
import { ContactsContext } from '../../contexts/ConcactsContext';
import * as firebase from 'firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

export default function ImportContacts({ route, navigation }) {
    // firebase.initializeApp(config);
    const { setSavedContacts } = useContext(ContactsContext)

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['profile', 'email', 'openid', 'https://www.googleapis.com/auth/contacts'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '879498274464-m00luc99iv14p0rgqq2tlpvatkkt7bt3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true,
            // hostedDomain: '', // specifies a hosted domain restriction
            // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            // accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            iosClientId: '879498274464-pb4eredqir7nov8sa32gq6h1hr6m83cc.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)

        });
    }, []);


    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const currentUser = GoogleSignin.getTokens().then((res) => {
                console.log(res.accessToken); //<
            })
            //   console.log(userInfo)
            //   console.log('yes2')
        } catch (error) {
            // alert(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(error, '1')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already  
                console.log(error, '2')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(error, 3)
            } else {
                // some other error happened
                alert(error)
            }
        }
    };

    const googleSignIn = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: '1004382062310-t089iha7ksl9hsqec3638r8u8urme0u1.apps.googleusercontent.com',
                scopes: ['profile', 'email', 'openid', 'https://www.googleapis.com/auth/contacts	'],
            });

            if (result.type === 'success') {
                console.log(result)
                fetchContacts(result.accessToken)
                return result.accessToken;
            } else {
                console.log('cancelled')
                return { cancelled: true };
            }
        } catch (e) {
            console.log('cancelled', e)
            return { error: true };
        }
    }
    const fetchContacts = async (token) => {
        try {
            let response = await fetch(
                "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&access_token=" + token
            );
            let responseJson = await response.json();
            responseJson['connections'].map(contact => {
                var obj = {}
                obj['fullname'] = contact['names'][0]['displayName']
                obj['email'] = contact['emailAddresses'][0]['value']
                globalContacts.push(obj)
            })
            globalContacts = sortContacts(globalContacts)
            setSavedContacts([...globalContacts])
            try {
                await AsyncStorage.setItem('contacts', JSON.stringify(globalContacts));
            } catch (error) {
                alert(error + 'this')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.wrapper}>
            <DefHeader />
            <View style={styles.title}>
                <Image source={require('../../assets/icon-importcontact-2.png')} />
                <Text size={20} color="black" style={styles.texttitle}>Import Contacts</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/yahoo.png')} />
                        <Text color='black' size={18}>Yahoo mail</Text>
                    </View>
                    <ImportButton onPress={() => navigation.navigate('YahooLogin')} />
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/gmail.png')} />
                        <Text color='black' size={18}>Gmail</Text>
                    </View>
                    <ImportButton onPress={() => signIn()} />
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/hotmail.png')} />
                        <Text color='black' size={18}>Hotmail</Text>
                    </View>
                    <ImportButton onPress={() => navigation.navigate('HotmailLogin')} />
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/popmail.png')} />
                        <Text color='black' size={18}>Pop/Imap mail</Text>
                    </View>
                    <ImportButton onPress={() => { }} />

                </View>
            </View>
        </View>

    )


}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    texttitle: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    mail: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,

    },
    mailview: {
        flexDirection: 'row',
        alignItems: 'center'
    }

});


