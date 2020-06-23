import React from 'react';
import { TouchableOpacity,Text } from 'react-native'

const ImportButton = (props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#FC5757",
                width:100,
                padding: 10,
                height: 35,
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
                Import
            </Text>
        </TouchableOpacity>
    );
};


export default ImportButton;