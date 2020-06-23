import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import DefHeader from '../../components/DefHeader';
import Text from '../../components/Text'
import DefButton from '../../components/DefButton';
import ImportButton from '../../components/ImportButton';

export default function ImportContacts() {
    return (
        <View style={styles.wrapper}>
            <DefHeader />
            <View style={styles.title}>
                <Image source={require('../../assets/icon-importcontact-2.png')} />
                <Text size={20} color="black" style={styles.texttitle}>Import Contacts</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/gmail.png')} />
                        <Text color='black' size={18}>Yahoo mail</Text>
                    </View>
                    <ImportButton onPress={() => { }} />
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/hotmail.png')} />
                        <Text color='black' size={18}>Gmail</Text>
                    </View>
                    <ImportButton onPress={() => { }} />
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/popmail.png')} />
                        <Text color='black' size={18}>Hotmail</Text>
                    </View>
                    <ImportButton onPress={() => { }} />
                </View>

                <View style={styles.mail}>
                    <View style={styles.mailview}>
                        <Image style={{ marginRight: 10 }} source={require('../../assets/yahoo.png')} />
                        <Text color='black' size={18}>Pop/Imap mail</Text>
                    </View>
                    <ImportButton onPress={() => { }} />

                </View>
            </View>
        </View>

    )


}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    texttitle: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    mail: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        
    },
    mailview: {
        flexDirection: 'row',
        alignItems: 'center'
    }

});