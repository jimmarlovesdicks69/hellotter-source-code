import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Text from './Text'
import * as Animatable from 'react-native-animatable';
import { FlatList } from 'react-native-gesture-handler';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const FilterPanel = (props) => {

    const [tabs, setTabs] = useState([
        { name: 'Favorites', selected: true },
        { name: 'Trending', selected: false },
        { name: 'Beauty', selected: false },
        { name: 'Fun', selected: false },
        { name: 'Kids', selected: false }
    ])

    const [selectedTab, setSelectedTab] = useState(0)
    const [selectedFilter, setSelectedFilter] = useState({ index: -1, selected: '' })



    return (
        <Animatable.View duration={500} animation={props.showFilterPanel ? "fadeInUp" : "fadeOutDown"}
            style={{ height: screenHeight, position: 'absolute', right: 0, bottom: 0, width: screenWidth }} >
            <View style={{ height: screenHeight * .70, backgroundColor: 'transparent' }} onTouchStart={() => props.onBackdropPressed()} />
            <View style={{ backgroundColor: 'black', opacity: 0.8, width: screenWidth, height: screenHeight * .30 }}>
                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 60, justifyContent: 'space-between' }}>
                        <Image source={require('../assets/stop.png')} />
                        <Image source={require('../assets/Favorite1.png')} />
                        <Image source={require('../assets/vline.png')} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10, justifyContent: 'space-between' }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {tabs.map((tab, index) => {
                                return (
                                    <TouchableOpacity style={{ height: 40, borderBottomWidth: (selectedTab == index) ? 3 : 0, borderBottomColor: 'white', marginRight: 15, alignItems: 'center', justifyContent: 'center', width: 100 }}
                                        onPress={() => setSelectedTab(index)}>
                                        <Text size={18}>{tab.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flexGrow: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Favorites selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} selectedTab={selectedTab} />
                </View>
            </View>
        </Animatable.View>


    )
};



export default FilterPanel;


const favoritesImages = [require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-352.png'), require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-112.png'), require('../assets/filters/stickers-115.png')]
const trendingImages = [ require('../assets/filters/stickers-352.png'), require('../assets/filters/maskicon-24.png'), require('../assets/filters/stickers-118.png'), require('../assets/filters/stickers-117.png'), require('../assets/filters/stickers-111.png'), require('../assets/filters/stickers-115.png'), require('../assets/filters/stickers-112.png'), require('../assets/filters/stickers-352.png')]
const beautyImages = [require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-352.png'), require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-355.png'), require('../assets/filters/stickers-355.png'),]
const funImages = [require('../assets/filters/stickers-370.png'), require('../assets/filters/stickers-370.png'), require('../assets/filters/stickers-370.png'), require('../assets/filters/stickers-370.png'), require('../assets/filters/stickers-370.png'), require('../assets/filters/stickers-370.png'), require('../assets/filters/stickers-370.png'), require('../assets/filters/stickers-370.png')]
const kidsImages = [require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-372.png'), require('../assets/filters/stickers-372.png'),]


const Favorites = (props) => {

    if (props.selectedTab == 0)
        return (
            <FlatList
                data={favoritesImages}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.setSelectedFilter({ index: index, selected: props.selectedTab })}>
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: '#33FFFF', borderWidth: (props.selectedFilter.index == index && props.selectedFilter.selected == props.selectedTab) ? 3 : 0, borderRadius: 50 }}
                                    source={favoritesImages[index]} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        )

    if (props.selectedTab == 1)
        return (
            <FlatList
                data={trendingImages}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.setSelectedFilter({ index: index, selected: props.selectedTab })}>
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: "#33FFFF", borderWidth: (props.selectedFilter.index == index && props.selectedFilter.selected == props.selectedTab) ? 3 : 0, borderRadius: 50 }}
                                    source={trendingImages[index]} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        )

    if (props.selectedTab == 2)
        return (
            <FlatList
                data={beautyImages}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.setSelectedFilter({ index: index, selected: props.selectedTab })}>
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: "#33FFFF", borderWidth: (props.selectedFilter.index == index && props.selectedFilter.selected == props.selectedTab) ? 3 : 0, borderRadius: 50 }}
                                    source={beautyImages[index]} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        )

    if (props.selectedTab == 3)
        return (
            <FlatList
                data={funImages}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.setSelectedFilter({ index: index, selected: props.selectedTab })}>
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: "#33FFFF", borderWidth: (props.selectedFilter.index == index && props.selectedFilter.selected == props.selectedTab) ? 3 : 0, borderRadius: 50 }}
                                    source={funImages[index]} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        )

    if (props.selectedTab == 4)
        return (
            <FlatList
                data={kidsImages}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.setSelectedFilter({ index: index, selected: props.selectedTab })}>
                            <View style={styles.imageWrapper}>
                                <Image style={{ borderColor: "#33FFFF", borderWidth: (props.selectedFilter.index == index && props.selectedFilter.selected == props.selectedTab) ? 3 : 0, borderRadius: 50 }}
                                    source={kidsImages[0]} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={4}
            />
        )




}
const styles = StyleSheet.create({
    imageWrapper: {
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    image: {
        borderColor: "#33FFFF"
    }

});