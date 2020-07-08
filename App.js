
import React, { Fragment, useEffect, useState, useMemo } from "react";
import 'react-native-gesture-handler';
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase';
import { StatusBar, StyleSheet, Image, View, ActivityIndicator, AsyncStorage, Platform } from 'react-native';


import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
//import * as Font from 'expo-font'


import Authentication from './screens/AuthenticationScreen/Authentication';
import Signup from "./screens/SignupScreen/Signup";
import ForgotPassword from "./screens/ForgotPasswordScreen/ForgotPassword";
import Splash from './screens/SplashScreen/Splash';
import Dashboard from './screens/DashboardScreen/Dashboard';
 import VideoCall from './screens/DashboardScreen/VideoCall'

import Contacts from './screens/ControlPanel/Contacts'
import Favorites from "./screens/ControlPanel/Favorites";
import Profile from "./screens/ProfileScreen/Profile";
import ImportContacts from "./screens/ControlPanel/ImportContacts";
import Account from "./screens/DrawerScreen/Account"
import NewProfile from "./screens/DrawerScreen/NewProfile"
import VirtualCoin from "./screens/DrawerScreen/VirtualCoin";
import AddCoins from "./screens/DrawerScreen/AddCoins";

import { AuthContext } from './contexts/context'
import UserInfoContextProvider from "./contexts/UserInfoContext";
import Call from "./screens/ControlPanel/Call";
import ChangePassword from "./screens/ForgotPasswordScreen/ChangePassword";
import { sortContacts } from "./Utils/Utils";
import ContactsContextProvider, { ContactsContext } from "./contexts/ConcactsContext";
import CustomDrawer from "./components/CustomDrawer";
import SendInvites from "./screens/ControlPanel/SendInvites";


import io from 'socket.io-client';
import FiltersAndStickersContextProvider from "./contexts/FiltersAndStickersContext";
import YahooLogin from "./screens/ControlPanel/YahooLogin";
import HotmailLogin from "./screens/ControlPanel/HotmailLogin";
const socket = io.connect('http://192.168.0.9:4443', { transports: ['websocket'] });

//const socket = io.connect('https://evening-shore-95443.herokuapp.com/', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('Socket:',socket.connected); // true
});

socket.on('message', function (message) {
  console.log('hello', message);
  var data = message;
  ///setCallResponse('');
  switch (data.type) {
    case 'handleVideoOffer':
      console.log('getting called');
      //handleVideoOffer(data);
      break;
  }
});
global.globalUserInfo = [];
global.globalContacts = [];
global.globalActiveUsers = [];

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#33FFFF',
    accent: '#FFFFFF',
    text: '#FFFFFF',
    placeholder: '#FFFFFF',
    background: '#FC5757'
  },
};


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
function DashBoardScreen() {
  return (
    <Drawer.Navigator drawerPosition="right" drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="DrawerDashboard" component={Dashboard} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="NewProfile" component={NewProfile} />
    </Drawer.Navigator>
  );
}
export default function App() {

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          email: action.token,
          isLoading: false
        }
      case "LOGIN":
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false
        }
      case "LOGOUT":
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false
        }
      case "REGISTER":
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)
      
  socket.on('roommessage', function (message) {
    var data = message;
    switch (data.type) {
      case 'login':
        console.log('New user : ' + data.username);
        global.globalActiveUsers.push(data.username);
        break;
      case 'disconnect':
        global.globalActiveUsers.forEach((item, index) => {
            if(item === data.username) {
                console.log('New user : ' + data.username);
                global.globalActiveUsers.splice(index, 1);
            }
        });
        break;
      default:
        break;
    }
  });

  const authContext = useMemo(() => ({
    signIn: async (isFound,contacts) => {
      let userToken;
      userToken = 'token';

      contacts.sort(function(a, b) {
        var nameA = a.fullname.toUpperCase(); // ignore upper and lowercase
        var nameB = b.fullname.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      var filteredContacts = contacts.filter(function(el) { return el.id != isFound['id']; });
      try {
        await AsyncStorage.setItem('token', userToken);
        await AsyncStorage.setItem('userinfo', JSON.stringify(isFound));
        // await AsyncStorage.setItem('contacts', JSON.stringify(filteredContacts));
      } catch (error) {

        alert(error+'this')
      }

      globalUserInfo = isFound
      // globalContacts = filteredContacts
      
      dispatch({ type: 'LOGIN', id: isFound['email'], token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userinfo');
        await AsyncStorage.removeItem('contacts');
      } catch (error) {
        alert(error)
      }
      dispatch({ type: 'LOGOUT' })
    },
  }))




  useEffect(() => {

    // async function loadFont() {
    //   await Font.loadAsync({
    //     regular: require('./assets/fonts/OpenSans-Regular.ttf')
    //   })
    // }
    // loadFont()

    setTimeout(async () => {
      let userToken = null;
      let userInfo = null
      let contacts = null
      try {
        userToken = await AsyncStorage.getItem('token');
        userInfo = await AsyncStorage.getItem('userinfo');
        contacts = await AsyncStorage.getItem('contacts');
      } catch (error) {
        alert(error)
      }
      console.log(userInfo+' app')
      globalUserInfo = JSON.parse(userInfo)
      globalContacts = JSON.parse(contacts)
      dispatch({ type: 'REGISTER', token: userToken });
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={styles.wrapper}>
        <Image source={require("./assets/icon.png")}
          style={styles.logo} />
        {/* <ActivityIndicator /> */}
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar hidden={(Platform.OS == 'ios')?false:true} backgroundColor='#33FFFF'/>
      <AuthContext.Provider value={authContext}>
      <ContactsContextProvider>
        <NavigationContainer>

          {loginState.userToken == null ? (
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="Authentication"
                component={Authentication}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
              />
            </Stack.Navigator>
          ) :
            <UserInfoContextProvider>
              <FiltersAndStickersContextProvider>
              <Stack.Navigator headerMode="none">
                <Stack.Screen
                  name="Dashboard"
                  component={DashBoardScreen}
                />
                  <Stack.Screen
                  name="VideoCall"
                  component={VideoCall}
                />
                <Stack.Screen
                  name="Contacts"
                  component={Contacts}
                />
                <Stack.Screen
                  name="Favorites"
                  component={Favorites}
                />
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                />
                 <Stack.Screen
                  name="Call"
                  component={Call}
                />
                 <Stack.Screen
                  name="ImportContacts"
                  component={ImportContacts}
                />
                <Stack.Screen
                    name="VirtualCoin"
                    component={VirtualCoin}
                  />
                  <Stack.Screen
                    name="AddCoins"
                    component={AddCoins}
                  />
                  <Stack.Screen
                    name="SendInvites"
                    component={SendInvites}
                  />
                  <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                  />
                  <Stack.Screen
                    name="YahooLogin"
                    component={YahooLogin}
                  />
                  <Stack.Screen
                    name="HotmailLogin"
                    component={HotmailLogin}
                  />
              </Stack.Navigator>
              </FiltersAndStickersContextProvider>
            </UserInfoContextProvider>
          }

        </NavigationContainer>
        </ContactsContextProvider>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white'
  },

  logo: {
    width: 300,
    height: 300,
  },

});