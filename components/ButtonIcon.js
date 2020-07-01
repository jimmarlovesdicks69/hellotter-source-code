import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Button } from "react-native-elements";
const screenWidth = Math.round(Dimensions.get('window').width);

const ButtonIcon = (props) => {
    return (
        <Button
            icon={
                <Image source={props.image} />
            }
            onPress={() => props.onPress()}
            buttonStyle={{ backgroundColor: 'red', borderRadius: 5, width: screenWidth * .4 }}
            title={props.title}
            // fontFamily="regular"
        />
    );
};

export default ButtonIcon;