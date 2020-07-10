import React from "react";
import { StyleSheet, View, TextInput, Image,Dimensions } from 'react-native';

import Text from './Text'
import { IconButton, Colors, useTheme } from 'react-native-paper';
import { normalize } from "../Utils/Utils";

const screenWidth = Math.round(Dimensions.get('window').width);
const Search = (props) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        view: {
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderBottomWidth: .8,
            borderTopWidth: .8,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
    });


    return (
        <View style={styles.view}>
            <Text color={'black'} size={20}>{props.name}</Text>
       
                <TextInput placeholder=" Search" style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    width: screenWidth * .7,
                    height:normalize(40),
                    borderWidth: 0.5,
                    borderStyle: 'solid',
                    fontSize: normalize(13),
                    borderRadius: 25,
                    margin:0,
                    
                }} 

                value={props.value}
                onChangeText={props.onChange}
                    
                />
 
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