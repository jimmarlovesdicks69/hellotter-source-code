import React, { useState, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { sortContacts } from '../../Utils/Utils';
import { ContactsContext } from '../../contexts/ConcactsContext';

export default function HotmailLogin({ navigation }) {
    const [loaded, setLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setSavedContacts } = useContext(ContactsContext)

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <WebView source={{ uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=b72cf7e1-ae25-468c-9f91-2fc1edc5c5a0&response_type=code&redirect_uri=https://example.com&response_mode=query&scope=contacts.read&state=12345' }}
            incognito={true}
            onLoadEnd={syntheticEvent => { }}>
        </WebView>
    )
}