import React, { useState, useContext } from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';
import { sortContacts } from '../../Utils/Utils';
import { ContactsContext } from '../../contexts/ConcactsContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../../components/Text';


const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default function YahooLogin({ navigation }) {
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

            <WebView source={{ uri: 'https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9RDIzS01UTmN2Nk1iJmQ9WVdrOWJ6UnJjVTVDTXpRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTQ1&response_type=code&redirect_uri=https://example.com' }}
                incognito={true}
                onLoadEnd={syntheticEvent => {
                    const { nativeEvent } = syntheticEvent;
                    var uri = nativeEvent.url
                    var pathArray = uri.split('/');
                    var host = pathArray[2];

                    if (host == "example.com" && !loaded) {
                        setIsLoading(true)
                        setLoaded(true)

                        var code = getUrlParameter('code', uri)

                        var details = {
                            'redirect_uri': 'https://example.com',
                            'code': code,
                            'grant_type': 'authorization_code'
                        };
                        var formBody = [];
                        for (var property in details) {
                            var encodedKey = encodeURIComponent(property);
                            var encodedValue = encodeURIComponent(details[property]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                        formBody = formBody.join("&");


                        fetch('https://api.login.yahoo.com/oauth2/get_token', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': 'Basic ZGoweUptazlSREl6UzAxVVRtTjJOazFpSm1ROVdWZHJPV0o2VW5KalZUVkRUWHBSYldOSGJ6bE5RUzB0Sm5NOVkyOXVjM1Z0WlhKelpXTnlaWFFtYzNZOU1DWjRQVFExOmVjNGI4NTUwZDZlYTk1NGY1YTlmMDMzYWEwNGNlMjJmZTZkYTgxODE='
                            },
                            body: formBody
                        }).then((response) => response.json())
                            .then(async (json) => {

                                var token = "Bearer " + json['access_token']

                                //get UID
                                let response2 = await fetch('https://social.yahooapis.com/v1/user/abcdef123/profile?format=json', {
                                    method: 'GET',
                                    headers: { 'Authorization': token.toString() }
                                })
                                let json2 = await response2.json();
                                let uid = json2["profile"]["guid"]

                                //get CONTACTS
                                let response3 = await fetch('https://social.yahooapis.com/v1/user/' + uid + '/contacts?format=json', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': token.toString()
                                    }
                                })
                                let json3 = await response3.json();
                                console.log(json3['contacts']['contact'].length)



                                json3['contacts']['contact'].map(contact => {
                                    var obj = {}

                                    contact['fields'].map(field => {
                                        let type = field['type']
                                        if (type == 'name') {
                                            obj['fullname'] = field['value']['givenName']
                                        }
                                        if (type == 'email') {
                                            obj['email'] = field['value']
                                        }
                                    })

                                    globalContacts.push(obj)
                                })
                                globalContacts = sortContacts(globalContacts)
                                setSavedContacts([...globalContacts])
                                setIsLoading(false)
                                navigation.goBack()

                            })
                            .catch((error) => {
                                alert(error)
                            });
                    }

                }} />
            
    )
}

function getUrlParameter(name, uri) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(uri);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};