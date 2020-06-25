import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import Text from '../../components/Text'
import DefHeader from '../../components/DefHeader';
import { Avatar } from 'react-native-elements';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { useTheme } from 'react-native-paper';
import { getEmailName, getInitials } from '../../Utils/Utils';

export default function Profile() {
    const { userInfo } = useContext(UserInfoContext)
    const { colors } = useTheme();

    return (
        <View style={styles.wrapper}>
            <DefHeader isBack={true} />
            <View style={styles.title}>
                <Text color="black" size={30}>Profile</Text>
            </View>
            <View style={styles.view}>
                <View>
                    <Avatar
                        rounded
                        overlayContainerStyle={{ backgroundColor: colors.primary }}
                        size={100}
                        title={<Text size={50}>{getInitials(userInfo.fullname)}</Text>}
                        onPress={() => console.log("Works!")}
                    />
                </View>
                <View style={styles.view2}>
                    <Text size={18} color={'black'} style={{ fontWeight: '700' }}>
                        {userInfo.fullname}
                    </Text>
                    <Text size={17} color={'black'}>
                        {getEmailName(userInfo.email)}
                    </Text>

                </View>

            </View>
            <View style={styles.status}>
                <View style={{ width: 20, height: 20, backgroundColor: "#55B842", borderRadius: 20, marginRight: 10 }}></View>
                <Text color='black' size={18}>Active</Text>
            </View>
            <View style={styles.content1}>
                <Text color='black' size={16} style={{width:100}}>Phone:</Text>
                <Text color='black' size={16} style={{ textAlign: 'left' }}>{userInfo.contact_number}</Text>
                <View />
                <View />
            </View>
            <View style={styles.content2}>
                <Text color='black' size={16} style={{width:100}}>Email:</Text>
                    <Text color='black' size={16} style={{ textAlign: 'left' }}>{userInfo.email}</Text>

            </View>
            <View style={styles.content2}>
                <Text color='black' size={16} style={{width:100}}>Address:</Text>
                    <Text color='black' size={16} style={{ textAlign: 'left' }}>{userInfo.address}</Text>

            </View>
            <View style={styles.content2}>
                <Text color='black' size={16} style={{width:100}}>Gender:</Text>
                <Text color='black' size={16} style={{ textAlign: 'left' }}>{userInfo.gender}</Text>

            </View>
            <View style={styles.content2}>
                <Text color='black' size={16} style={{width:100}}>Birthday:</Text>
                <Text color='black' size={16} style={{ textAlign: 'left' }}>{userInfo.birth}</Text>
                <View />
                <View />
            </View>
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
        paddingTop: 20,
        justifyContent: "center",
        alignItems: 'center'
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    view2: {
        marginLeft: 15
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30
    },
    content1: {
        marginTop:10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: .5,
        borderBottomWidth: .5,
    },
    content2: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .5,

    }
});