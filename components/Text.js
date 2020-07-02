import React from 'react';
import ReactNative, { Dimensions, Platform, PixelRatio } from 'react-native';


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 380;


export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const Text = (props) => {

    const getProps = () => {
        const { weigth, size, color } = props;

        return {
            fontSize: normalize(size),
            color
        }
    }
    Text.defaultProps = {
        weigth: "regular",
        size: normalize(15),
        color: 'white'
    }
    return (
        <ReactNative.Text style={{ ...getProps(), ...props.style }}>
            {props.children}
        </ReactNative.Text>
    );
};

export default Text;