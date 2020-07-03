import React, { createContext, useState } from 'react';

export const FiltersAndStickersContext = createContext();


const FiltersAndStickersContextProvider = (props) => {
    const [selectedFilterOrSticker, setSelectedFilterOrSticker] = useState({index:null,selectedPanel: 1,selectedTab:0})
    const [selectedBackground, setSelectedBackground] = useState({index:null, selectedPanel:1})

    const setFilterOrSticker = (index, selectedPanel, selectedTab) => {
        console.log(index)
        setSelectedFilterOrSticker({ index: index, selectedPanel: selectedPanel, selectedTab: selectedTab })
    }

    const setBackground = (index, selectedPanel) => {
        setSelectedBackground({index: index, selectedPanel: selectedPanel})
    } 


    return (
        <FiltersAndStickersContext.Provider value={{ selectedFilterOrSticker, setFilterOrSticker, selectedBackground, setBackground }}>
            {props.children}
        </FiltersAndStickersContext.Provider>
    );
}

export default FiltersAndStickersContextProvider;
