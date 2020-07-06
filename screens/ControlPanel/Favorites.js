import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native'

import DefHeader from '../../components/DefHeader';
import Profile from '../../components/Profile';
import FavoritesSearch from '../../components/FavoritesSearch';
import { ScrollView } from 'react-native-gesture-handler';
import ControlPanel from '../../components/ControlPanel';
import { Avatar } from "react-native-elements";
import { useTheme } from 'react-native-paper';
import Text from '../../components/Text'
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { getInitials } from '../../Utils/Utils';


const screenHeight = Math.round(Dimensions.get('window').height);
export default function Favorites() {
    const { userInfo } = useContext(UserInfoContext)

    const [onEdit, setOnEdit] = useState(false)

    const { colors } = useTheme();

    const names = ['Adam Morison', 'Alison Green', 'Amanda White', 'Amelia Benington', 'Benjamin Gordon', 'Bella Miteli', 'Blake Gousard', 'Bernadette Longley', 'Brandon Eagle', 'Brian Brown']
    var letter;

    return (
        <View style={styles.wrapper}>
            <DefHeader isBack={true} />
            <Profile fullname={userInfo.fullname} email={userInfo.email} />
            <FavoritesSearch name='Favorites' onPress={() => setOnEdit(!onEdit)} onEdit={onEdit} />
            <ScrollView>
                <View style={styles.favoritesContainer}>
                    {globalContacts.map((name, index) => {
                        // if (letter != name[0]) {
                        //     letter = name[0]
                        //     return (
                        //         <View key={index} style={styles.letterContainer}>
                        //             <Text color={'black'}>{name[0]}</Text>
                        //         </View>
                        //     )
                        // }

                        var nextLetter = (index == globalContacts.length - 1) ? "" : globalContacts[index + 1][0];
                        return (
                            <View key={index}>
                                <TouchableOpacity style={styles.contactView} disabled={onEdit}>
                                    <Avatar
                                        rounded
                                        overlayContainerStyle={{ backgroundColor: colors.primary }}
                                        size={30}
                                        title={<Text size={15}>{getInitials(name['fullname'])}</Text>}
                                        onPress={() => console.log("Works!")}
                                    />
                                    <View style={styles.nameContainer}>
                                        <Text color={'black'}>{name['fullname']}</Text>
                                        {onEdit &&
                                            <TouchableOpacity>
                                                <Image style={{ width: 20, height: 20 }} source={require('../../assets/icon-cross.png')} />
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </TouchableOpacity>
                                {/* <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                        marginRight:15,
                                        marginLeft:50
                                    }}
                                /> */}
                                {/* {name[0] == nextLetter &&
                                    <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                            marginHorizontal: 15
                                        }}
                                    />
                                } */}
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
    favoritesContainer: {
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
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderBottomWidth: .5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contactView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 10,
    }
});