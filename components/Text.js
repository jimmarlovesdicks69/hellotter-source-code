import React from 'react';
import ReactNative, { } from 'react-native';

const Text = (props) => {

    const getProps = () => {
        const { weigth,size,color } = props;

        return {
            fontSize: size,
            fontFamily: weigth,
            color
        }
    }
    Text.defaultProps = {
        weigth: "regular",
        size:15,
        color:'white'
    }
    return (
        <ReactNative.Text style={{ ...getProps(), ...props.style }}>
            {props.children}
        </ReactNative.Text>
    );
};

export default Text;