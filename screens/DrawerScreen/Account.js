import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import Text from '../../components/Text'

import DefHeader from '../../components/DefHeader';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Account({ navigation }) {
    const { userInfo } = useContext(UserInfoContext)

    return (
        <View style={styles.wrapper}>
            <DefHeader isBack={true} />
            <View style={styles.title}>
                <Text color="black" size={30}>Account</Text>
            </View>
            <View style={styles.subTitle}>
                <Text color="black" size={20}>Account information</Text>
            </View>
            <View style={styles.content}>
                <Text color="black" size={18} style={{ marginRight: 10 }}>Email:</Text>
                <Text color="blue" size={15}>{userInfo['email']}</Text>
            </View>
            <View style={styles.content2}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text color="black" size={18} style={{ marginRight: 10 }}>Password:</Text>
                    <Text color="black" size={18}>******************</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('ChangePassword', { 'email': userInfo.email, 'from': 'account' })}>
                    <Text color="blue" size={15}>change</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 40 }} />
            <View style={styles.subTitle}>
                <Text color="black" size={20}>Payment</Text>
            </View>
            <TouchableOpacity>
                <View style={styles.content2}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text color="black" size={18} style={{ marginRight: 10 }}>Payment method:</Text>
                        <Text color="black" size={18}>Strype payment</Text>
                        <Text color="black" size={18}></Text>
                    </View>
                    {/* <MaterialIcons name="navigate-next" size={25} color="black" /> */}
                </View>
            </TouchableOpacity>
            <View style={{ height: 40 }} />
            <View style={styles.subTitle}>
                <Text color="black" size={20}>Virtual coin management</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('VirtualCoin')}>
                <View style={styles.content2}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text color="black" size={18} style={{ marginRight: 10 }}>Virtual wallet:</Text>
                        <Text color="black" size={18}>$120</Text>
                        <Text color="black" size={18}></Text>
                    </View>
                    {/* <MaterialIcons name="navigate-next" size={25} color="black" /> */}

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

    },
    videoView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    title: {
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: 'center'
    },
    subTitle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#E6E6E6'
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderBottomWidth: .5,
        alignItems: 'center'
    },
    content2: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderBottomWidth: .5,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});