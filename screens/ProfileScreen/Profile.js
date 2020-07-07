import React, { useContext, useState } from 'react';
import { View, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import Text from '../../components/Text'
import { Avatar } from "react-native-elements";
import { useTheme } from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { getInitials, getLastName, getFirstName } from '../../Utils/Utils';
import LogoutConfirmation from '../../components/LogoutConfirmation';
import { AuthContext } from '../../contexts/context';
import DefButton from '../../components/DefButton';

const screenHeight = Math.round(Dimensions.get('window').height);
const Profile = ({ navigation }) => {
    const { signOut } = useContext(AuthContext);
    const { userInfo } = useContext(UserInfoContext)

    const [showSignout, setShowSignOut] = useState(false)

    const { colors } = useTheme();

    return (

        <ScrollView>
            <View style={styles.wrapper}>
                <SafeAreaView style={{ backgroundColor: 'white' }}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.navigationContainer}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Text color={'black'} size={20}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text color={'black'} size={20}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileContainer}>
                            <Avatar
                                rounded
                                overlayContainerStyle={{ backgroundColor: colors.primary }}
                                size={100}
                                title={<Text size={50}>{getInitials(userInfo.fullname)}</Text>}
                                onPress={() => console.log("Works!")}
                            />
                            <Text style={{ marginTop: 10 }} color={'black'} size={20}>{userInfo.fullname}</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.textView}>
                            <Text color='grey' size={16}>Email</Text>
                            <Text color='black' size={17}>{userInfo.email}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text color='grey' size={16}>First Name</Text>
                            <Text color='black' size={17}>{getFirstName(userInfo.fullname)}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text color='grey' size={16}>Last Name</Text>
                            <Text color='black' size={17}>{getLastName(userInfo.fullname)}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text color='grey' size={16}>Birth</Text>
                            <Text color='black' size={17}>{userInfo.birth}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text color='grey' size={16}>Gender</Text>
                            <Text color='black' size={17}>{userInfo.gender}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text color='grey' size={16}>Phone</Text>
                            <Text color='black' size={17}>{userInfo.phone}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text color='grey' size={16}>Address</Text>
                            <Text color='black' size={17} style={{ textAlign: 'right' }}>{userInfo.address}</Text>
                        </View>
                    </View>
                    <View style={styles.passwordContainer}>
                        <Text style={{ marginBottom: 10 }} color='grey'>Password</Text>
                        <View style={styles.textView}>
                            <Text color="black">***************</Text>
                            <TouchableOpacity>
                                <Text color="blue">Change</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: "#FC5757", padding: 20, borderRadius: 30, margin: 30 }}
                            onPress={() => setShowSignOut(true)}>
                            <Text style={{ color: "#FFFFFF", textAlign: "center", fontWeight: 'bold' }}>
                                LOGOUT
                        </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                {showSignout &&
                    <LogoutConfirmation onPressCancel={() => setShowSignOut(false)} onPressLogout={() => signOut()} />
                }
            </View>
        </ScrollView>

    );
};

export default Profile;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    avatarContainer: {
        height: screenHeight * .30,
        backgroundColor: 'white'
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        height: screenHeight * .5,
        borderTopWidth: .5,
        borderBottomWidth: .5,
        padding: 20,
        justifyContent: 'space-evenly'
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    passwordContainer: {
        height: screenHeight * .25,
        backgroundColor: 'white',
        padding: 20
    }
});