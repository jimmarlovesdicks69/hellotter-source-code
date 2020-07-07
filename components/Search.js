import React from "react";
import { StyleSheet, View, TextInput, Image,Dimensions } from 'react-native';

import Text from './Text'
import { IconButton, Colors, useTheme } from 'react-native-paper';

const screenWidth = Math.round(Dimensions.get('window').width);
const Search = (props) => {
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
        text: {
            fontSize: 20
        }
    });


    return (
        <View style={styles.view}>
            <Text color={'black'} style={styles.text}>{props.name}</Text>
            <View style={{ borderRadius: 10 }}>
                <TextInput placeholder=" Search" style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    width: screenWidth * .7,
                    height:40,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    fontSize: 15,
                    borderRadius: 25,
                }} 

                value={props.value}
                onChangeText={props.onChange}
                    
                />
            </View>
            {props.withButton &&
                <IconButton
                    icon={require('../assets/Plus.png')}
                    color={colors.primary}
                    style={{ margin: 0,padding:0 }}
                    size={25}
                    onPress={() => console.log('Pressed')}
                />
            }
        </View>
    )
}

Text.defaultProps = {
    withButton: false
}


export default Search