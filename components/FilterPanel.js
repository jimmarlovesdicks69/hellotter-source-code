import React, { useState, useEffect, useContext } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Text from './Text'
import * as Animatable from 'react-native-animatable';
import { FlatList } from 'react-native-gesture-handler';
import { FiltersAndStickersContext } from '../contexts/FiltersAndStickersContext';
import FiltersContainer from './FiltersContainer';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const FilterPanel = (props) => {
    const { setFilterOrSticker, selectedFilterOrSticker } = useContext(FiltersAndStickersContext)


    const [tabs, setTabs] = useState([
        { name: 'Favorites', selected: true },
        { name: 'Trending', selected: false },
        { name: 'Beauty', selected: false },
        { name: 'Fun', selected: false },
        { name: 'Kids', selected: false }
    ])

    const [selectedPanel, setSelectedPanel] = useState(0)
    const [favoritesImages, setFavoritesImages] = useState([]);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        console.log(selectedFilterOrSticker)
    }, [selectedFilterOrSticker]);


    // useEffect(() => {
    //     console.log(selectedFilter)
    //     return () => {
    //         setSelectedFilter({ index: -1, selected: '' })
    //     }
    // }, []);

    return (

        <View style={{ backgroundColor: 'black', opacity: 0.8, width: screenWidth, height: screenHeight * .30 }}>
            <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setFilterOrSticker( null, selectedPanel,0 )}><Image source={require('../assets/stop.png')} /></TouchableOpacity>
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
                <FiltersContainer selectedPanel={selectedPanel} favoritesImages={favoritesImages} />
            </View>

        </View>

    )
};
export default FilterPanel;



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
        return beautyImages[index]
    } else if (selected == 3) {
        return funImages[index]
    } else if (selected == 4) {
        return kidsImages[index]
    }
}

const trendingImages = [require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'), require('../assets/filters/stickers-352.png')]
const beautyImages = [require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'),]
const funImages = [require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'), require('../assets/filters/stickers-370.png')]
const kidsImages = [require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'),]



const styles = StyleSheet.create({
    imageWrapper: {
        paddingHorizontal: screenWidth * .055,
        paddingBottom: 15
    },
    image: {
        borderColor: "#33FFFF"
    }

});