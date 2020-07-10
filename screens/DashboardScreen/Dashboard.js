import React, { Fragment, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform } from 'react-native';
import DefHeader from '../../components/DefHeader'
import ControlPanel from '../../components/ControlPanel'
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from '../../contexts/context'
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { ContactsContext } from "../../contexts/ConcactsContext";
import FilterPanel from "../../components/FilterPanel";
import FiltersAndStickersView from "../../components/FiltersAndStickersView";
import BackgroundView from "../../components/BackgroundView";
import { bgData } from "../../Utils/Datas/BackgroundData"
import { FiltersAndStickersContext } from "../../contexts/FiltersAndStickersContext";
import GiftView from "../../components/GiftView";


//import { black } from "react-native-paper/lib/typescript/src/styles/colors";

export default function Dashboard({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const { userInfo, setUser } = useContext(UserInfoContext)
  const { contacts, setSavedContacts } = useContext(ContactsContext)

  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [showBackgroundPanel, setShowBackgroundPanel] = useState(false)
  const [showGiftPanel, setShowGiftPanel] = useState(false)
  const [countRender, setCountRender] = useState(false)

  const { selectedBackground } = useContext(FiltersAndStickersContext)

  // const [BackgroundData, setBackgroundData] = useState()

  // console.log(globalUserInfo)

  useEffect(() => {
    // globalContacts.splice(0, 1)
    setUser(globalUserInfo)
    
    globalContacts != null ? setSavedContacts([...globalContacts]) : null
    globalContacts = []
  }, [])

  useEffect(() => {
    console.log(selectedBackground)
  }, [selectedBackground])

  // useEffect(() => {
  //   console.log(showFilterPanel)
  // }, [showFilterPanel])

  return (
    <Fragment>
      <View style={styles.wrapper}>
        <DefHeader />
        {/* <View style={styles.videoView}> */}

        <ImageBackground source={bgData[selectedBackground.selectedPanel][selectedBackground.index]} style={{ flexGrow: 1, resizeMode: 'cover' }}>

        </ImageBackground>
        {/* </View> */}


        {
          (!showFilterPanel && !showBackgroundPanel && !showGiftPanel) ?
            Platform.OS == "ios" ?
              <SafeAreaView style={{ backgroundColor: 'black' }}>
                <ControlPanel
                  onFilterPanelPressed={() => { setShowFilterPanel(true); setCountRender(true) }}
                  onBackgroundPanelPressed={() => { setShowBackgroundPanel(true); setCountRender(true) }}
                  onGiftPanelPressed={() => { setShowGiftPanel(true); setCountRender(true) }}
                />
              </SafeAreaView> :
              <ControlPanel
                onFilterPanelPressed={() => { setShowFilterPanel(true); setCountRender(true) }}
                onBackgroundPanelPressed={() => { setShowBackgroundPanel(true); setCountRender(true) }}
                onGiftPanelPressed={() => { setShowGiftPanel(true); setCountRender(true) }}
              /> :
            null

        }


        {(countRender && showBackgroundPanel == true) &&
          <BackgroundView onBackdropPressed={() => setShowBackgroundPanel(false)} showBackgroundPanel={showBackgroundPanel} />
        }
        {(countRender && showFilterPanel == true) &&
          <FiltersAndStickersView onBackdropPressed={() => setShowFilterPanel(false)} showFilterPanel={showFilterPanel} />
        }
        {(countRender && showGiftPanel == true) &&
          <GiftView onBackdropPressed={() => setShowGiftPanel(false)} showGiftPanel={showGiftPanel} />
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