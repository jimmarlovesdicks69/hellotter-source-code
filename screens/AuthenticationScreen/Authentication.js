import React, { Fragment,useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { validateEmail } from '../../Utils/Utils';

import { CheckBox, Input } from "react-native-elements";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AuthContext } from '../../contexts/context'
import DefButton from "../../components/DefButton";
import Text from "../../components/Text";


import io from 'socket.io-client';

const socket = io.connect('http://192.168.0.9:4443', { transports: ['websocket'] });

//const socket = io.connect('https://evening-shore-95443.herokuapp.com/', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('Socket:',socket.connected); // true
});


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default function Authentication({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const { signIn } = useContext(AuthContext);
 
 
  useEffect(() => {
  });

  const login = (email, password) => {
    const error1 = validateEmail(email) ? "" : "Invalid Email";
    const error2 = password.length > 0 ? "" : "Password Required";


    setErrorMessage1(error1)
    setErrorMessage2(error2)

    if (!error1 && !error2) {
      setisLoading(true)
      fetch("http://3.23.32.212/api/login.php", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }).then(res => res.json())
        .then(async(response) => {
          
          if (response['error'] == true) {
            setErrorMessage2(response['message'])
            setisLoading(false)
          } else {
            /* socket.send({
              type: 'login',
              name: email,
            }); */
            let response2 = await fetch('http://3.23.32.212/api/fetch_contacts.php');
            let json = await response2.json();
            signIn(response,json)
            setisLoading(false)
          }
        }).catch(error => {
          alert(error)
        });

    }
  };

  const onLogin = (data) => {
    console.log('message from socket:', data);
  }

  socket.on('message', function (message) {
  var data = message;
  switch (data.type) {
    case 'login':
      onLogin(data);
      break;
  }
  });

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableAutomaticScroll
      extraScrollHeight={10}
      enableOnAndroid={true}
      style={styles.scroll}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.image}
      >

        <View>
          <Image style={styles.icon} source={require('../../assets/Hellotter-logo-white.png')} />
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            underlineColor="#fff"
            onChangeText={(value) => setEmail(value)}
          />
          <HelperText
            style={styles.error}
            type="error"
            visible={errorMessage1}
          >
            {errorMessage1}
          </HelperText>
          <TextInput
            style={styles.input}
            label="Password"
            underlineColor="#fff"
            value={password}
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
          />
          <HelperText
            style={styles.error}
            type="error"
            visible={errorMessage2}
          >
            {errorMessage2}
          </HelperText>
          <CheckBox
                        containerStyle={styles.checkBox}
                        title="Remember me"
                        checked={rememberMe}
                        checkedColor='white'
                        textStyle={{ color: 'white' }}
                        onPress={() => setRememberMe(!rememberMe)}
                    />
          <DefButton onPress={() => login(email, password)} text="LOGIN" />
          <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>



        <View style={styles.view2}>
                    <View style={styles.view3}>
                        <Text size={15} color="white"> 
                           {"Not a Member? "} 
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text color="white" size={15} style={styles.signup}>
                                Sign up
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.version}>
                        V1.0.1
                    </Text>
                </View>


        {isLoading &&
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </ImageBackground>
    </KeyboardAwareScrollView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: screenHeight,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "space-between",
  },
  icon: {
    marginTop: screenHeight*.01,
    marginBottom: screenHeight*.05,
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  input: {
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  error: {
    marginBottom: 5,
    fontFamily: "regular"
  },
  checkBox: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    margin: 0,
    marginBottom: 10,
    padding: 0
},
  forgotPassword: {
    color: 'white',
    alignSelf: "center",
    textDecorationLine: 'underline',
  },
  signup: {
    color: 'white',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  version: {
    color: 'white'
  },
  view2: {
    alignItems: 'center'
  },
  spinner: {
    backgroundColor: 'white',
    opacity: .5,
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view3: {
    flexDirection: 'row',
    marginBottom: 10,
},

});
