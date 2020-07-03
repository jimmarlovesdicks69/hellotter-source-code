import React, { Fragment, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import DefHeader from '../../components/DefHeader'
import ControlPanel from '../../components/ControlPanel'
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from '../../contexts/context'
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { ContactsContext } from "../../contexts/ConcactsContext";
import FilterPanel from "../../components/FilterPanel";
import FiltersAndStickersView from "../../components/FiltersAndStickersView";
import BackgroundView from "../../components/BackgroundView";
//import { black } from "react-native-paper/lib/typescript/src/styles/colors";

export default function Dashboard({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const { userInfo, setUser } = useContext(UserInfoContext)
  const { contacts, setSavedContacts } = useContext(ContactsContext)

  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [showBackgroundPanel, setShowBackgroundPanel] = useState(false)
  const [countRender, setCountRender] = useState(false)
  // console.log(globalUserInfo)

  useEffect(() => {
    globalContacts.splice(0, 1)
    setUser(globalUserInfo)
    setSavedContacts([...globalContacts])
  }, [])


  useEffect(() => {
    console.log(showFilterPanel)
  }, [showFilterPanel])

  return (
    <Fragment>
      <View style={styles.wrapper}>
        <DefHeader />
        {/* <View style={styles.videoView}> */}

        <ImageBackground source={require('../../assets/BGthrone.png')} style={{ flexGrow: 1, resizeMode: 'cover' }}>
          
        </ImageBackground>
        {/* </View> */}


        {
          (!showFilterPanel && !showBackgroundPanel) &&
          <ControlPanel
            onFilterPanelPressed={() => { setShowFilterPanel(true); setCountRender(true) }}
            onBackgroundPanelPressed={() => { setShowBackgroundPanel(true); setCountRender(true) }}
          />
        }


        {(countRender && showBackgroundPanel == true) &&
          <BackgroundView onBackdropPressed={() => setShowBackgroundPanel(false)} showBackgroundPanel={showBackgroundPanel} />
        }
        {(countRender && showFilterPanel == true) &&
          <FiltersAndStickersView onBackdropPressed={() => setShowFilterPanel(false)} showFilterPanel={showFilterPanel} />
        }
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