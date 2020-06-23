import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

import Text from './Text'
import { IconButton, Colors, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FavoritesSearch = (props) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        view: {
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderBottomWidth: .8,
            borderTopWidth: .8,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        buttons: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            fontSize: 20
        },
        text2: {
            marginRight: 20,
        }
    });

    return (
        <View style={styles.view}>
            <Text color={'black'} style={styles.text}>{props.name}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={()=> props.onPress()}>
                    <Text size={15} color={'#267CFF'} style={styles.text2}>{props.onEdit ==true?'Done': 'Edit'}</Text>
                </TouchableOpacity>
                <IconButton
                    icon={require('../assets/Plus.png')}
                    color={colors.primary}
                    style={{ margin: 0 }}
                    size={25}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        </View>
    );
};

export default FavoritesSearch;