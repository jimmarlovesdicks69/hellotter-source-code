import React, { useState, useContext } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Text from './Text'
import { FiltersAndStickersContext } from '../contexts/FiltersAndStickersContext';
import StickersContainer from './StickersContainer';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const StickersPanel = () => {
    const { setFilterOrSticker, selectedFilterOrSticker } = useContext(FiltersAndStickersContext)


    const [tabs, setTabs] = useState([
        { name: 'Favorites', selected: true },
        { name: 'Trending', selected: false },
        { name: 'Foods', selected: false },
        { name: 'Drinks', selected: false },
        { name: 'Animal', selected: false }
    ])
    const [selectedPanel, setSelectedPanel] = useState(0)
    const [favoritesImages, setFavoritesImages] = useState([]);

    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <View style={{ backgroundColor: 'black', opacity: 0.8, width: screenWidth, height: screenHeight * .40 }}>
            <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setFilterOrSticker(null, selectedPanel, 0)}><Image source={require('../assets/stop.png')} /></TouchableOpacity>
                    <TouchableOpacity
                        disabled={isFavorited(selectedPanel, selectedFilterOrSticker.index, favoritesImages)}
                        onPress={() => {

                            var filter = addToFavorites(selectedPanel, selectedFilterOrSticker.index)
                            // console.log(filter)

                            setFavoritesImages(prevState => [...prevState, filter])


                        }}><Image source={require('../assets/Favorite1.png')} /></TouchableOpacity>
                    <Image source={require('../assets/vline.png')} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10, justifyContent: 'space-between' }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {tabs.map((tab, index) => {
                            return (
                                <TouchableOpacity style={{ height: 40, borderBottomWidth: (selectedPanel == index) ? 3 : 0, borderBottomColor: 'white', marginRight: 15, alignItems: 'center', justifyContent: 'center', width: 100 }}
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
                <StickersContainer selectedPanel={selectedPanel} favoritesImages={favoritesImages} />
            </View>
        </View>
    );
};


export default StickersPanel;


function isFavorited(selected, index, favoritesImages) {
    if (selected == " " || selected == 0)
        return false

    var fav = [...favoritesImages]
    var filter = addToFavorites(selected, index)
    var bool = (fav.includes(filter)) ? true : false
    return bool;
}

function addToFavorites(selected, index) {
    // console.log(index, selected)
    if (selected == 1) {
        // console.log('ops')
        return trendingImages[index]
    } else if (selected == 2) {
        return foodsImages[index]
    } else if (selected == 3) {
        return drinksImages[index]
    } else if (selected == 4) {
        return animalImages[index]
    }
}


const trendingImages = [require('../assets/stickers/3.png'), require('../assets/stickers/4.png'), require('../assets/stickers/5.png'), require('../assets/stickers/6.png'), require('../assets/stickers/7.png'), require('../assets/stickers/8.png'), require('../assets/stickers/9.png'), require('../assets/stickers/10.png')]
const foodsImages = [require('../assets/stickers/4.png'), require('../assets/stickers/7.png'), require('../assets/stickers/10.png'), require('../assets/stickers/6.png'), require('../assets/stickers/8.png'), require('../assets/stickers/5.png'), require('../assets/stickers/3.png'), require('../assets/stickers/9.png')]
const drinksImages = [require('../assets/stickers/5.png'), require('../assets/stickers/8.png'), require('../assets/stickers/4.png'), require('../assets/stickers/3.png'), require('../assets/stickers/9.png'), require('../assets/stickers/7.png'), require('../assets/stickers/10.png'), require('../assets/stickers/6.png')]
const animalImages = [require('../assets/stickers/6.png'), require('../assets/stickers/9.png'), require('../assets/stickers/3.png'), require('../assets/stickers/4.png'), require('../assets/stickers/10.png'), require('../assets/stickers/5.png'), require('../assets/stickers/7.png'), require('../assets/stickers/8.png')]
