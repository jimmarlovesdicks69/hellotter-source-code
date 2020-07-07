import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { FiltersAndStickersContext } from '../contexts/FiltersAndStickersContext';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const FiltersContainer = (props) => {
    const trendingImages = [require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'), require('../assets/filters/stickers-352.png')]
    const beautyImages = [require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'),]
    const funImages = [require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'), require('../assets/filters/stickers-370.png')]
    const kidsImages = [require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'),]

    const { setFilterOrSticker, selectedFilterOrSticker } = useContext(FiltersAndStickersContext)

    if (props.selectedPanel == 0) {
        return (
            <FlatList
                data={props.favoritesImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 0) ? 3 : 0, borderRadius: 50 }}
                                    source={item}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        );
    }
    if (props.selectedPanel == 1) {
        return (
            <FlatList
                data={trendingImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 0) ? 3 : 0, borderRadius: 50 }}
                                    source={item}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        );
    }
    if (props.selectedPanel == 2) {
        return (
            <FlatList
                data={beautyImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 0) ? 3 : 0, borderRadius: 50 }}
                                    source={item}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        );
    }
    if (props.selectedPanel == 3) {
        return (
            <FlatList
                data={funImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 0) ? 3 : 0, borderRadius: 50 }}
                                    source={item}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        );
    }
    if (props.selectedPanel == 4) {
        return (
            <FlatList
                data={kidsImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
                                    source={item}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        );
    }
};


export default FiltersContainer;

const styles = StyleSheet.create({
    imageWrapper: {
        paddingHorizontal: screenWidth * .055,
        paddingBottom: 15
    },
    tab: {
        width: screenWidth * .5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }

});