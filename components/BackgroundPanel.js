import React, { useState, useContext } from 'react';
import { Dimensions, View, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Text from './Text'
import BackgroundView from './BackgroundView';
import BackgroundContainer from './BackgroundContainer';
import { FiltersAndStickersContext } from '../contexts/FiltersAndStickersContext';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const BackgroundPanel = (props) => {
    const { selectedBackground, setBackground } = useContext(FiltersAndStickersContext)

    const [tabs, setTabs] = useState([
        { name: 'Favorites', selected: true },
        { name: 'Trending', selected: false },
        { name: 'Eating out', selected: false },
        { name: 'Drinks', selected: false },
        { name: 'Celebration', selected: false },
        { name: 'Hangout', selected: false },
        { name: 'Kids', selected: false },
        { name: 'Sports Event', selected: false },
    ])

    const [selectedPanel, setSelectedPanel] = useState(0)
    const [favoritesImages, setFavoritesImages] = useState([]);
    return (
        <View style={{ backgroundColor: 'black', opacity: 0.8, width: screenWidth, height: screenHeight * .30 }}>
            <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {setBackground(null, selectedPanel, 0)}}><Image source={require('../assets/stop.png')} /></TouchableOpacity>
                    <TouchableOpacity
                        // disabled={isFavorited(selectedPanel, selectedFilterOrSticker.index, favoritesImages)}
                        onPress={() => {

                           


                        }}><Image source={require('../assets/Favorite1.png')} /></TouchableOpacity>
                    <Image source={require('../assets/vline.png')} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10, justifyContent: 'space-between' }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {tabs.map((tab, index) => {
                            return (
                                <TouchableOpacity style={{ height: 40, borderBottomWidth: (selectedPanel == index) ? 3 : 0, borderBottomColor: 'white', marginRight: 15, alignItems: 'center', justifyContent: 'center', width: 110 }}
                                    key={index}
                                    onPress={() => setSelectedPanel(index)}>
                                    <Text size={18}>{tab.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
            <View style={{ flexGrow: 1, paddingVertical: 20 }}>
                <BackgroundContainer selectedPanel={selectedPanel} favoritesImages={favoritesImages} />
            </View>
        </View>
    );
};


export default BackgroundPanel;