import React, { useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet, Image, SafeAreaView, Platform } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterPanel from './FilterPanel';
import StickersPanel from './StickersPanel';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const FiltersAndStickersView = (props) => {
    const [tab, setTab] = useState(0)
    const [show, setShow] = useState(true)


    useEffect(() => {
        props.showFilterPanel ? setShow(props.showFilterPanel) : null
    }, [props.showFilterPanel]);

    if (show) {
        return (
            <Snfcontainer>
                <Animatable.View duration={500} animation={props.showFilterPanel ? "fadeInUp" : "fadeOutDown"} onAnimationEnd={() => { (!props.showFilterPanel) ? setShow(false) : setShow(true) }}
                    style={{ height: screenHeight, position: 'absolute', right: 0, bottom: 0, width: screenWidth }} >

                    <View style={{ flexGrow: 1, backgroundColor: 'transparent' }} onTouchStart={() => props.onBackdropPressed()} />

                    <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', width: screenWidth, }}>
                        {tab == 0 ?
                            <FilterPanel /> :
                            <StickersPanel />
                        }

                        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>

                            <TouchableOpacity style={[styles.tab]} onPress={() => setTab(0)} disabled={tab == 0}>
                                <View style={[styles.triangle, { borderBottomColor: tab == 0 ? '#33FFFF' : '#212121' }]}></View>

                                <View style={{ backgroundColor: tab == 0 ? '#33FFFF' : '#212121', padding: 10, width: screenWidth / 2, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image source={tab == 0 ? require('../assets/Filters.png') : require('../assets/Filters1.png')} />
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tab]} onPress={() => setTab(1)} disabled={tab == 1}>
                                <View style={[styles.triangle, { borderBottomColor: tab == 1 ? '#33FFFF' : '#212121' }]}></View>

                                <View style={{ backgroundColor: tab == 1 ? '#33FFFF' : '#212121', padding: 10, width: screenWidth / 2, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image source={tab == 1 ? require('../assets/Stickers1.png') : require('../assets/Stickers2.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            </Snfcontainer>
        )

    } else {
        return (
            <View />
        )
    }


};


export default FiltersAndStickersView;

function Snfcontainer(props) {
    return (
        Platform.OS == 'ios' ?
            <SafeAreaView style={{ backgroundColor: 'black' }}>
                <SafeAreaView>
                    {props.children}
                </SafeAreaView>
            </SafeAreaView> :
            <View>
                {props.children}
            </View>

    )
}


const styles = StyleSheet.create({
    imageWrapper: {
        paddingHorizontal: screenWidth * .055,
        paddingBottom: 15
    },
    tab: {
        width: screenWidth * .5,
        // padding: 5,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',

        alignSelf: 'center'
    }

});