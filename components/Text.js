import React from 'react';
import ReactNative, { Dimensions, Platform, PixelRatio } from 'react-native';
import { normalize } from '../Utils/Utils';


const Text = (props) => {


    const getProps = () => {
        const { weigth, size, color } = props;

        return {
            fontFamily: weigth,
            fontSize: normalize(size),
            color: color
        }
    }
    Text.defaultProps = {
        weigth: 'OpenSans-Regular',
        size: normalize(15),
        color: 'white'
    }

    return (
        <ReactNative.Text style={[getProps(), props.style]}>
            {props.children}
        </ReactNative.Text>
    );
};



export default Text;