import React, { Fragment, useState, useEffect } from "react";
import { TextInput, HelperText } from "react-native-paper";

const Inputfield = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (event) =>{
        setValue(event.target.value)
        props.onChangeText(event.target.name, event.target.value)
    }

    return (
        <TextInput
            name={props.name}
            label={props.label}
            value={props.value? props.value: value}
            underlineColor="#fff"
            onChangeText={(event) => handleChange(event)}
        />
    )
}

Inputfield.defaultProps = {
    label:"",
    value:"",
    name:""
}


export default Inputfield