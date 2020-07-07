import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Button } from "react-native-elements";
import Text from './Text';
const screenWidth = Math.round(Dimensions.get('window').width);

const ButtonIcon = (props) => {
    return (
        <Button
            icon={
                <Image source={props.image} />
            }
            onPress={() => props.onPress()}
            buttonStyle={{ backgroundColor: "#FC5757", borderRadius: 5, width: screenWidth * .4 }}
            title={<Text>{props.title}</Text>}
            fontFamily="regular"
        />
    );
};

export default ButtonIcon;