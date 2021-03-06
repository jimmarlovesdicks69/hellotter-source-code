import React, { Fragment, useContext, useState, useEffect } from "react";
import { StyleSheet, View, Image, Button, Dimensions, Platform, SafeAreaView } from 'react-native';


import DefHeader from '../../components/DefHeader'
import Profile from '../../components/Profile'
import Search from '../../components/Search'
import ButtonIcon from "../../components/ButtonIcon";
import ControlPanel from "../../components/ControlPanel";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Text from '../../components/Text'
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { ContactsContext } from "../../contexts/ConcactsContext";
import { isIphoneX } from "../../Utils/Utils";

const screenHeight = Math.round(Dimensions.get('window').height);
export default function Contacts({ navigation }) {

    const { userInfo } = useContext(UserInfoContext)
    const { searchContacts, contacts } = useContext(ContactsContext)

    const [search, setSearch] = useState("");

    const [activeUsers, setActiveUsers] = useState(globalActiveUsers);
    var letter;



    const callUser = (callee) => {
        console.log(`${userInfo.email} calling ${callee}`);
        navigation.navigate('Dashboard', { isCalling: true, caller: userInfo.email, callee });
    };

    const contactDatas = () => {
        return (
            searchContacts(search).map((name, index) => {
                var nextLetter = (index == contacts.length - 1) ? "" : contacts[index + 1]['fullname'][0];
                // if (letter != name['fullname'][0]) {
                //     letter = name['fullname'][0]
                var isLetter = letter != name['fullname'][0]
                letter = name['fullname'][0]
                return (
                    <View key={index}>

                        {isLetter &&
                            <View style={styles.letterContainer}>
                                <Text color={'black'}>{name['fullname'][0].toUpperCase()}</Text>
                            </View>
                        }
                        <TouchableOpacity onPress={() => callUser(name.email)}>
                            <View style={styles.nameContainer}>
                                <Text color={'black'}>{name['fullname']}</Text>
                            </View>
                        </TouchableOpacity>
                        {name['fullname'][0] == nextLetter &&
                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                    marginHorizontal: 15
                                }}
                            />
                        }

                    </View>
                )
            })
        )
    }

    return (
        <View style={styles.wrapper}>
            <DefHeader />
            <Profile fullname={userInfo.fullname} email={userInfo.email} />
            <Search name="Contacts" value={search} onChange={(val) => setSearch(val)} />
            <ScrollView>
                <View style={styles.contactsContainer}>
                    {contactDatas()}
                </View>
            </ScrollView>
            <View style={styles.importContainer}>
                <ButtonIcon title="  Import Contacts" image={require('../../assets/icon-importcontact.png')} onPress={() => navigation.navigate('ImportContacts')} />
                <ButtonIcon title="  Send Invites" image={require('../../assets/icon-sendinvites.png')} onPress={() => navigation.navigate('SendInvites')} />
            </View>
            <SafeAreaView style={{ backgroundColor: 'black' }}>
                <ControlPanel />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    contactsContainer: {
        flexGrow: 1,
    },
    importContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        borderTopWidth: .5,
        marginBottom: Platform.OS == 'ios' ? isIphoneX() ? screenHeight * .01 : screenHeight * .07 : screenHeight * .10
    },
    letterContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    nameContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white'
    }
});