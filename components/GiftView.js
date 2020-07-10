import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Dimensions, View, Image } from 'react-native';
import Text from './Text';
import ButtonIcon from './ButtonIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const GiftView = (props) => {
    const [show, setShow] = useState(true)
    if (show) {
        return (
            <Animatable.View duration={500} animation={props.showGiftPanel ? "fadeInUp" : "fadeOutDown"} onAnimationEnd={() => { (!props.showGiftPanel) ? setShow(false) : setShow(true) }}
                style={{ height: screenHeight, position: 'absolute', right: 0, bottom: 0, width: screenWidth }} >
                <View style={{ flexGrow: 1, backgroundColor: 'transparent' }} onTouchStart={() => props.onBackdropPressed()} />

                <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', width: screenWidth, }}>
                    <View style={{padding:10,alignItems:'center',justifyContent:'center',backgroundColor:'#FF3333',flexDirection:'row'}}>
                        <Image source={require('../assets/gift-white.png')}/>
                        <Text style={{marginLeft:15}} size={17}>Send Gift</Text>
                    </View>
                    <View style={{backgroundColor:'black',flexDirection:'row',justifyContent:'space-between',padding:15}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text size={17}>My Coins: </Text>
                            <Text size={17} color='#33FFFF'>200</Text>
                        </View>
                        <ButtonIcon title="  ADD COINS" image={require('../assets/stack.png')} onPress={()=>{}}/>
                    </View>
                    <View style={{height:screenHeight * .4,padding:15}}>
                        <View style={{paddingVertical:10,borderBottomWidth:.5,borderColor:'white'}}></View>
                        <View style={{flexGrow:1}}></View>
                    </View>
                    <View style={{borderTopWidth:.3,borderBottomWidth:.3,borderColor:'grey',padding:10,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{}}>
                        <Text size={17} color='#33FFFF'>{"Send Gift"}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={25} color="#33FFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        );
    }
    return (
        <View />
    )
};



export default GiftView;