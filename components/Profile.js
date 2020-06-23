import React from "react";
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Avatar } from "react-native-elements";

import Text from './Text'
import { getInitials, getEmailName } from "../Utils/Utils";

const Profile = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        view: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20
        },
        view2: {
            marginLeft: 15
        }
    });

    return (
        <View style={styles.view}>
            <View>
                <Avatar
                    rounded
                    overlayContainerStyle={{ backgroundColor: colors.primary }}
                    size={100}
                    title={<Text size={50}>{getInitials(props.fullname)}</Text>}
                    onPress={() => console.log("Works!")}
                />
            </View>
            <View style={styles.view2}>
                <Text color={'black'} style={{ fontWeight: '700' }}>
                    {props.fullname}
                </Text>
                <Text color={'black'}>
                    {props.email}
                </Text>
                <Text color={'black'}>
                    {getEmailName(props.email)}
                </Text>
            </View>
        </View>
    )
}

export default Profile

