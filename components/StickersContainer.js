import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { FiltersAndStickersContext } from '../contexts/FiltersAndStickersContext';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const StickersContainer = (props) => {
    const trendingImages = [require('../assets/stickers/3.png'), require('../assets/stickers/4.png'), require('../assets/stickers/5.png'), require('../assets/stickers/6.png'), require('../assets/stickers/7.png'), require('../assets/stickers/8.png'), require('../assets/stickers/9.png'), require('../assets/stickers/10.png')]
    const foodsImages = [require('../assets/stickers/4.png'), require('../assets/stickers/7.png'), require('../assets/stickers/10.png'), require('../assets/stickers/6.png'), require('../assets/stickers/8.png'), require('../assets/stickers/5.png'), require('../assets/stickers/3.png'), require('../assets/stickers/9.png')]
    const drinksImages = [require('../assets/stickers/5.png'), require('../assets/stickers/8.png'), require('../assets/stickers/4.png'), require('../assets/stickers/3.png'), require('../assets/stickers/9.png'), require('../assets/stickers/7.png'), require('../assets/stickers/10.png'), require('../assets/stickers/6.png')]
    const animalImages = [require('../assets/stickers/6.png'), require('../assets/stickers/9.png'), require('../assets/stickers/3.png'), require('../assets/stickers/4.png'), require('../assets/stickers/10.png'), require('../assets/stickers/5.png'), require('../assets/stickers/7.png'), require('../assets/stickers/8.png')]

    const { setFilterOrSticker, selectedFilterOrSticker } = useContext(FiltersAndStickersContext)

    if (props.selectedPanel == 0) {
        return (
            <FlatList
                data={props.favoritesImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 1)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 1) ? 3 : 0, borderRadius: 50 }}
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
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 1)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 1) ? 3 : 0, borderRadius: 50 }}
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
                data={foodsImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 1)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 1) ? 3 : 0, borderRadius: 50 }}
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
                data={drinksImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 1)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedFilterOrSticker.index == index && selectedFilterOrSticker.selectedPanel == props.selectedPanel && selectedFilterOrSticker.selectedTab == 1) ? 3 : 0, borderRadius: 50 }}
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
                data={animalImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setFilterOrSticker(index, props.selectedPanel, 1)}
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


export default StickersContainer;

const styles = StyleSheet.create({
    imageWrapper: {
        width: screenWidth*.25,
        height: screenHeight*.15,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom: 15,
    },
    tab: {
        width: screenWidth * .5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }

});