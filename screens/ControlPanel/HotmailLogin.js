import React, { useState, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { sortContacts, getUrlParameter } from '../../Utils/Utils';
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
            onLoadEnd={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                var uri = nativeEvent.url
                var pathArray = uri.split('/');
                var host = pathArray[2];
                alert(host)
                if (host == "example.com" && !loaded) {
                    var code = getUrlParameter('code', uri)

                    var details = {
                        'redirect_uri': 'https://example.com',
                        'code': code,
                        'grant_type': 'authorization_code',
                        'client_id': 'b72cf7e1-ae25-468c-9f91-2fc1edc5c5a0',
                        'scope': 'contacts.read',
                        'client_secret': '-Lokhk8tO38ZKJnt_u119E_22.FPvJ.6Rg'
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");

                    fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formBody
                    }).then((response) => response.json())
                        .then(async (json) => {
                            var token = "Bearer " + json['access_token']
                            

                        }).catch((error) => {
                            alert(error)
                        });
                }
            }}>
        </WebView>
    )
}