import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Dimensions, View } from 'react-native';
import BackgroundPanel from './BackgroundPanel';
import { SafeAreaView } from 'react-native-safe-area-context';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const BackgroundView = (props) => {

    return (
        <SafeAreaView style={{ backgroundColor: 'black' }}>
            <SafeAreaView>
                <Animatable.View duration={500} animation={props.showBackgroundPanel ? "fadeInUp" : "fadeOutDown"}
                    style={{ height: screenHeight, position: 'absolute', right: 0, bottom: 0, width: screenWidth }} >
                    <View style={{ flexGrow: 1, backgroundColor: 'transparent' }} onTouchStart={() => props.onBackdropPressed()} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', width: screenWidth, }}>
                        <BackgroundPanel />
                    </View>
                </Animatable.View>
            </SafeAreaView>
        </SafeAreaView>
    );
};


export default BackgroundView;