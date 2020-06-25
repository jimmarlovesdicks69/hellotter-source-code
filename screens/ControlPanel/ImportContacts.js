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


export default function ImportContacts({ route, navigation }) {
    // firebase.initializeApp(config);
    const { setSavedContacts } = useContext(ContactsContext)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log("We are authenticated now!");
            }
        })

    }, []);

   
   

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
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/gmail.png')} />
                        <Text color='black' size={18}>Gmail</Text>
                    </View>
                    <ImportButton onPress={() => googleSignIn()} />
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/hotmail.png')} />
                        <Text color='black' size={18}>Hotmail</Text>
                    </View>
                    <ImportButton onPress={() => { }} />
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


