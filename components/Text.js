import React from 'react';
import ReactNative, { Dimensions, Platform, PixelRatio } from 'react-native';
import { normalize } from '../Utils/Utils';


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
        <ReactNative.Text style={[getProps(), props.style ]}>
            {props.children}
        </ReactNative.Text>
    );
};

export default Text;