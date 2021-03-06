import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, SafeAreaView } from 'react-native';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import DefHeader from '../../components/DefHeader';
import Profile from '../../components/Profile';
import Search from '../../components/Search';
import Text from '../../components/Text';

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ControlPanel from '../../components/ControlPanel';

import { IconButton, useTheme } from 'react-native-paper';
import { ContactsContext } from '../../contexts/ConcactsContext';


const screenHeight = Math.round(Dimensions.get('window').height);
export default function Call() {
    const { userInfo } = useContext(UserInfoContext)
    const { searchContacts, contacts } = useContext(ContactsContext)
    const [search, setSearch] = useState("");


    const { colors } = useTheme();
    const names = ['Adam Morison', 'Alison Green', 'Amanda White', 'Amelia Benington', 'Benjamin Gordon', 'Bella Miteli', 'Blake Gousard', 'Bernadette Longley', 'Brandon Eagle', 'Brian Brown']
    var letter;

    return (
        <View style={styles.wrapper}>
            <DefHeader/>
            <Profile fullname={userInfo.fullname} email={userInfo.email} />
            <Search name="Call" withButton={true} value={search} onChange={(val) => setSearch(val)} />

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

                                    <View style={styles.nameContainer}>
                                        <Text color={'black'}>{name['fullname']}</Text>
                                        <IconButton
                                            icon={require('../../assets/Plus.png')}
                                            color={colors.primary}
                                            size={25}
                                            style={{ margin: 0 }}
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </View>

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
                                <View style={styles.nameContainer}>
                                    <Text color={'black'}>{name['fullname']}</Text>
                                    <IconButton
                                        icon={require('../../assets/Plus.png')}
                                        color={colors.primary}
                                        size={25}
                                        style={{ margin: 0 }}
                                        onPress={() => console.log('Pressed')}
                                    />
                                </View>
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
            <View style={{ marginBottom: Platform.OS == 'ios' ? screenHeight * .01 : screenHeight * .10 }} />
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
        borderTopWidth: .5
    },
    letterContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    nameContainer: {
        paddingVertical: 3,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

});