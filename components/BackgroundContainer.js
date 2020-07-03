import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { FiltersAndStickersContext } from '../contexts/FiltersAndStickersContext';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const FiltersContainer = (props) => {
    const trendingImages = [require('../assets/backgrounds/ebe-43.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-45.png'), require('../assets/backgrounds/ebe-46.png'), require('../assets/backgrounds/ebe-47.png'), require('../assets/backgrounds/ebe-48.png'), require('../assets/backgrounds/ebe-49.png'), require('../assets/backgrounds/ebe-50.png')]
    const eatingout = [require('../assets/backgrounds/ebe-50.png'), require('../assets/backgrounds/ebe-49.png'), require('../assets/backgrounds/ebe-48.png'), require('../assets/backgrounds/ebe-47.png'), require('../assets/backgrounds/ebe-46.png'), require('../assets/backgrounds/ebe-45.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-43.png')]
    const drinks = [require('../assets/backgrounds/ebe-49.png'), require('../assets/backgrounds/ebe-48.png'), require('../assets/backgrounds/ebe-46.png'), require('../assets/backgrounds/ebe-47.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-45.png'), require('../assets/backgrounds/ebe-43.png'), require('../assets/backgrounds/ebe-50.png')]
    const celebration = [require('../assets/backgrounds/ebe-49.png'), require('../assets/backgrounds/ebe-50.png'), require('../assets/backgrounds/ebe-45.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-43.png'), require('../assets/backgrounds/ebe-46.png'), require('../assets/backgrounds/ebe-47.png'), require('../assets/backgrounds/ebe-48.png')]
    const hangout = [require('../assets/backgrounds/ebe-49.png'), require('../assets/backgrounds/ebe-48.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-46.png'), require('../assets/backgrounds/ebe-47.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-50.png'), require('../assets/backgrounds/ebe-43.png')]
    const kids = [require('../assets/backgrounds/ebe-50.png'), require('../assets/backgrounds/ebe-49.png'), require('../assets/backgrounds/ebe-48.png'), require('../assets/backgrounds/ebe-47.png'), require('../assets/backgrounds/ebe-46.png'), require('../assets/backgrounds/ebe-45.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-43.png')]
    const sportsevent = [require('../assets/backgrounds/ebe-43.png'), require('../assets/backgrounds/ebe-44.png'), require('../assets/backgrounds/ebe-45.png'), require('../assets/backgrounds/ebe-46.png'), require('../assets/backgrounds/ebe-47.png'), require('../assets/backgrounds/ebe-48.png'), require('../assets/backgrounds/ebe-49.png'), require('../assets/backgrounds/ebe-50.png')]

    const {setBackground, selectedBackground} = useContext(FiltersAndStickersContext)

    if (props.selectedPanel == 0) {
        return (
            <FlatList
                data={props.favoritesImages}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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
                data={eatingout}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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
                data={drinks}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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
                data={celebration}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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
    if (props.selectedPanel == 5) {
        return (
            <FlatList
                data={hangout}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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
    if (props.selectedPanel == 6) {
        return (
            <FlatList
                data={kids}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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
    if (props.selectedPanel == 7) {
        return (
            <FlatList
                data={sportsevent}
                keyExtractor={item => trendingImages.indexOf(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setBackground(index, props.selectedPanel, 0)}
                        >
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (selectedBackground.index == index && selectedBackground.selectedPanel == props.selectedPanel) ? 3 : 0, borderRadius: 50 }}
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