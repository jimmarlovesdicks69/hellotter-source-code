import React, { Fragment, useContext, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import DefHeader from '../../components/DefHeader'
import ControlPanel from '../../components/ControlPanel'
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from '../../contexts/context'
import { UserInfoContext } from "../../contexts/UserInfoContext";

export default function Dashboard({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const { userInfo, setUser } = useContext(UserInfoContext)

  setUser(globalUserInfo)
  console.log(globalUserInfo)
  useEffect(() => {

  }, [])

  return (
    <Fragment>
      <View style={styles.wrapper}>
        <DefHeader />
        {/* <View style={styles.videoView}> */}

        <ImageBackground source={require('../../assets/BGthrone.png')} style={{ flexGrow: 1, resizeMode: 'cover' }}>
          <TouchableOpacity onPress={() => signOut()}>
            <View style={{ height: 20, width: 60, backgroundColor: 'white' }}>
              <Text>Sign Out</Text>
            </View>

          </TouchableOpacity>
        </ImageBackground>
        {/* </View> */}


        <ControlPanel />
      </View>
    </Fragment>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

  },
  videoView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  }
});