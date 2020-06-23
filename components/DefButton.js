import React from 'react';
import { TouchableOpacity } from 'react-native'
import Text from './Text';

const DefButton = (props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#FC5757",
                padding: 10,
                margin: 15,
                height: 40,
                borderRadius: 3,
            }}
            onPress={() => props.onPress()}
        >
            <Text
                style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontWeight:'bold'
                }}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
};


export default DefButton;