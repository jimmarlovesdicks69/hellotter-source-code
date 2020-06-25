import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import DefHeader from '../../components/DefHeader';

import Text from '../../components/Text'
import { useTheme } from 'react-native-paper';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { getInitials } from '../../Utils/Utils';
import { Avatar } from 'react-native-elements';
import DefButton from '../../components/DefButton';
export default function VirtualCoin({navigation}) {
    const { userInfo } = useContext(UserInfoContext)
    const { colors } = useTheme();
    return (
        <View style={styles.wrapper}>
            <DefHeader isBack={true} />
            <View style={styles.title}>
                <Text color="black" size={25} style={{ marginBottom: 15 }}>Virtual Coin Management</Text>
                <Avatar
                    rounded
                    overlayContainerStyle={{ backgroundColor: colors.primary }}
                    size={100}
                    title={<Text size={50}>{getInitials(userInfo.fullname)}</Text>}
                    onPress={() => console.log("Works!")}
                />
                <Text style={{ marginTop: 10 }} color={'black'} size={20}>{userInfo.fullname}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.wallet}>
                    <Image source={require('../../assets/wallet.png')} />
                    <Text color='black' size={15}>Virtual Wallet</Text>
                    <Text color='#2E84FF' size={50} style={{ fontWeight: 'bold' }}>$120</Text>
                </View>

                <DefButton text="Add Coins" onPress={()=> navigation.navigate("AddCoins")}></DefButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: .5
    },
    content: {
        padding: 20,
    },
    wallet:{
        alignSelf:'center',
        width:200,
        height:200,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderRadius:200,
        borderColor:'#2E84FF'
    }
});