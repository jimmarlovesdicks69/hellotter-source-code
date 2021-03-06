import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Keyboard
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { validateEmail, isIphoneX } from '../../Utils/Utils';

import { CheckBox, Input } from "react-native-elements";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AuthContext } from '../../contexts/context'
import DefButton from "../../components/DefButton";
import Text from "../../components/Text";


// import io from 'socket.io-client';

// const socket = io.connect('http://192.168.0.9:4443', { transports: ['websocket'] });

//const socket = io.connect('https://evening-shore-95443.herokuapp.com/', { transports: ['websocket'] });

// socket.on('connect', () => {
//   console.log('Socket:', socket.connected); // true
// });


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


  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
        .then(async (response) => {

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
            signIn(response, json)
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

  // socket.on('message', function (message) {
  //   var data = message;
  //   switch (data.type) {
  //     case 'login':
  //       onLogin(data);
  //       break;
  //   }
  // });

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      scrollEnabled={isKeyboardVisible}
      style={styles.scroll}

    >
      <View style={styles.parent1}>

        <SafeAreaView>
          <View style={styles.child1}>

            <Image style={styles.icon} source={require('../../assets/hellootter_singup.png')} resizeMode={'cover'} />
          </View>
        </SafeAreaView>


        <View style={styles.parent2}>
          <View style={styles.child2}>
            <View>
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
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword} size={17}>
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
                V1.1.1
                    </Text>
            </View>
          </View>
        </View>
        {isLoading &&
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </View>
    </KeyboardAwareScrollView>
    // <KeyboardAwareScrollView
    //   showsVerticalScrollIndicator={false}
    //   enableAutomaticScroll
    //   extraScrollHeight={10}
    //   enableOnAndroid={true}
    //   style={styles.scroll}
    // >
    //   <ImageBackground
    //     source={require("../../assets/background.png")}
    //     style={styles.image}
    //   >




    //     {isLoading &&
    //       <View style={styles.spinner}>
    //         <ActivityIndicator size="large" color="#0000ff" />
    //       </View>
    //     }
    //   </ImageBackground>
    // </KeyboardAwareScrollView>


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
    width:85,
    height:85

  },
  input: {
    backgroundColor: "transparent",
  },
  error: {
    marginBottom: 5
  },
  checkBox: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    alignSelf: 'stretch',
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
    width: screenWidth,
    paddingHorizontal: 40,
    padding: 0,
    // margin:0
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
  parent1: {
    flex: 1,
    backgroundColor: "#33FFFF"
  },
  parent2: {
    height: Platform.OS == 'ios' ? (isIphoneX() ? screenHeight * .85 - 44 : screenHeight * .85 - 20) : screenHeight * .85,
    width: "100%",
    alignSelf: 'center',
    backgroundColor: "#3389FF",
    transform: [{ scaleX: 1.5 }],
    borderTopStartRadius: 300,
    borderTopEndRadius: 300,
    overflow: 'hidden',

  },
  child1: {
    height: screenHeight * .15,
    backgroundColor: "#33FFFF",
    alignItems: 'center',
    justifyContent: 'center',
  },
  child2: {
    flex: 1,
    transform: [{ scaleX: 0.70 }],
    backgroundColor: '#3389FF',
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 40
  },


});
