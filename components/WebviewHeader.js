import React from 'react';
import Text from './Text';
import { View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenHeight = Math.round(Dimensions.get('window').height);
const WebviewHeader = (props) => {
    return (
        <View style={{ backgroundColor: '#D6D6D6', height: screenHeight*.10, padding: 10 }}>
            <Text color='black' size={13} style={{ textAlign: 'center',marginBottom:10 }}>{props.url}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={()=>props.onPress()}>
                    <Text color='#0E77EE' size={15} style={{ textAlign: 'center' }}>Cancel</Text>
                </TouchableOpacity>
                <Text color='black' size={15} style={{ textAlign: 'center', fontWeight: 'bold' }}>{props.site}</Text>
                <Text color='transparent' size={15} style={{ textAlign: 'center' }}>Cancel</Text>
            </View>
        </View>
    );
};

export default WebviewHeader;