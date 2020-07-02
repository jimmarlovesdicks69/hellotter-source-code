import React, { Fragment, useContext, useState, useEffect } from "react";
import { StyleSheet, View, Image,Button, Dimensions } from 'react-native';


import DefHeader from '../../components/DefHeader'
import Profile from '../../components/Profile'
import Search from '../../components/Search'
import ButtonIcon from "../../components/ButtonIcon";
import ControlPanel from "../../components/ControlPanel";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Text from '../../components/Text'
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { ContactsContext } from "../../contexts/ConcactsContext";

const screenHeight = Math.round(Dimensions.get('window').height);
export default function Contacts({ navigation }) {

    const { userInfo } = useContext(UserInfoContext)
    const { searchContacts,contacts } = useContext(ContactsContext)
 
    const [search, setSearch] = useState("");

    const [activeUsers, setActiveUsers] = useState(globalActiveUsers);
    var letter;

 
  
    const callUser = (callee) => {
      console.log(`${userInfo.email} calling ${callee}`);
      navigation.navigate('Dashboard', {  isCalling: true, caller:userInfo.email, callee });
    };

    return (
        <View style={styles.wrapper}>
            <DefHeader isBack={true}/>
            <Profile fullname={userInfo.fullname} email={userInfo.email} />
            <Search name="Contacts" value={search} onChange={(val) => setSearch(val)}/>
             <ScrollView>
                <View style={styles.contactsContainer}>
                    {searchContacts(search).map((name, index) => {
                        var nextLetter = (index == globalContacts.length - 1) ? "" : globalContacts[index + 1]['fullname'][0];
                        if (letter != name['fullname'][0]) {
                            letter = name['fullname'][0]
                            return (
                                <View key={index}>
                                    <View style={styles.letterContainer}>
                                        <Text color={'black'}>{name['fullname'][0].toUpperCase()}</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=> callUser(name.email)}>
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
                        }

                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={()=> callUser(name.email)}>
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
                    })}

                </View>
            </ScrollView>
            <View style={styles.importContainer}>
                <ButtonIcon title="  Import Contacts" image={require('../../assets/icon-importcontact.png')} onPress={()=>navigation.navigate('ImportContacts')}/>
                <ButtonIcon title="  Send Invites" image={require('../../assets/icon-sendinvites.png')} onPress={() => navigation.navigate('SendInvites')} />
            </View>
            <ControlPanel />
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
        marginBottom:screenHeight * .10
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