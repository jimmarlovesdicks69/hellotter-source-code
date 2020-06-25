import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, Dimensions, ActivityIndicator } from 'react-native'
import Text from '../../components/Text'
import DefHeader from '../../components/DefHeader';
import DefButton from '../../components/DefButton';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import * as Animatable from 'react-native-animatable';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default function SendInvites() {
    // var emails = ['reypogado@gmail.com', 'tiffanymarata@yahoo.com', 'rgg@mail.com', 'test@mail.com']
    const [emails, setEmails] = useState([])
    const [emailText, setEmailText] = useState('')
    const [isBackSpace, setIsBackSpace] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showBanner, setShowBanner] = useState(false)

    const { userInfo } = useContext(UserInfoContext)

    const sendInvites = () => {
        if (emails.length == 0) {
            alert("Must eneter atleast 1 email")
            return
        }

        setIsLoading(true)
        fetch("http://3.23.32.212/api/send_invites.php", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emails: emails,
                name: userInfo.fullname
            })
        }).then(res => res.json())
            .then(response => {
                setEmails([])
                setIsLoading(false)
                setShowBanner(true)
            }).catch(error => {
                alert(error)
            });


    }


    useEffect(() => {
        if (emailText == "  ") {
            setEmailText(' ')
            return
        }
        if (emailText[emailText.length - 1] == " " && emailText != " ") {
            console.log(emailText.isEmpty)
            setEmails(prevState => [...prevState, emailText])
            setEmailText(' ')
        }

        if (isBackSpace == true && emailText == "") {
            emails.pop()
            setEmailText(' ')
        }


    }, [emailText, isBackSpace]);

    return (
        <View style={styles.wrapper}>
            <DefHeader isBack={true} />
            <View style={styles.title}>
                <Text color="black" size={25}>Invite Friends</Text>
            </View>
            <View style={styles.emailContents}>
                {emails.map((email, i) => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={styles.textEmail} color='black'>{email}</Text>
                            <Text style={{ marginBottom: 5 }} color='black'>, </Text>
                        </View>
                    )
                })}
                <TextInput
                    // style={{ flex: 1,flexWrap: 'wrap' }}
                    onKeyPress={({ nativeEvent }) => {
                        nativeEvent.key === "Backspace" ? setIsBackSpace(true) : setIsBackSpace(false)

                    }}
                    autoFocus={true}
                    blurOnSubmit={false}
                    onChangeText={(val) => setEmailText(val)}
                    value={emailText}

                />

            </View>

            <DefButton text="Send Invitation" onPress={() => sendInvites()}></DefButton>
            {isLoading &&
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
            {showBanner &&
                <Animatable.View animation="fadeInDown" duration={1000} delay={0} iterationDelay={2000} direction="alternate" 
                iterationCount={2} onAnimationEnd={()=>setShowBanner(false)} style={styles.banner}>
                    <Text color="black" size={20}>Success!</Text>
                    <Text color="black">Invitation has been sent</Text>
                </Animatable.View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: .5
    },
    emailContents: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        margin: 20

    },
    textEmail: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderWidth: 2,
        borderColor: "#2B81FF",
        borderRadius: 20,
        marginBottom: 5
    },
    spinner: {
        backgroundColor: 'white',
        opacity: .5,
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    banner: {
        flex: 1,
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: screenWidth * .25,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }

})
