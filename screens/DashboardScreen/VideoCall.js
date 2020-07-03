import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Dimensions,
  StatusBar,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import ListView from 'deprecated-react-native-listview';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCPeerConnectionConfiguration,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';

const { width, height } = Dimensions.get('window');
import io from 'socket.io-client';
import _ from 'lodash';
const socket = io.connect('https://evening-shore-95443.herokuapp.com/', { transports: ['websocket'] });
socket.on('connect', () => {
  console.log(socket.connected); // true
});

socket.on('disconnect', () => {
  console.log(0); // true
});
let _this;
let username;
let busy = false;
let incallwith = ''; // To store username of other peer
var localPC = null, remotePC = null; // RTCRtpTransceiver
var isConnected = false;
var localICECandidates =[];
const configuration = {  };
// let configuration = {};
configuration.iceServers = [];
// // second step, set STUN url
 configuration.iceServers.push({
   urls: ['stun:numb.viagenie.ca:3478', 'stun:st.hellotter.com:3478?transport=udp', 'stun:st.hellotter.com:5349?transport=tcp']
});


// last step, set TURN url (recommended) 
configuration.iceServers.push({ 
  url: 'turn:numb.viagenie.ca:3478' ,  
  username: 'sweeti270789@gmail.com', 
  credential: 'Hotwire@21'
});  


console.log("configuration:", configuration);
//configuration.iceServers.push({
  //urls: ['stun:stun.l.google.com:19302', 'stun:st.geniusschoolmanager.com:5349']
//});

/* configuration.iceServers.push({
  'url': 'turn:st.geniusschoolmanager.com:5349',
  'credential': 'password@gsm',
  'username': 'gsm'
}); */

configuration.iceTransportPolicy = "all";


function log(text) {
  var time = new Date();
  console.log('[' + time.toLocaleTimeString() + '] ' + text);
}

function log_error(text) {
  var time = new Date();
  console.trace('[' + time.toLocaleTimeString() + '] ' + text);
}

function handleGetUserMediaError(e) {
  log_error(e);
  switch (e.name) {
    case 'NotFoundError':
      alert('Unable to open your call because no camera and/or microphone' + 'were found.');
      break;
    case 'SecurityError':
    case 'PermissionDeniedError':
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert('Error opening your camera and/or microphone: ' + e.message);
      break;
  }
}

// Handles reporting errors. Currently, we just dump stuff to console but
// in a real-world application, an appropriate (and user-friendly)
// error message should be displayed.

function reportError(errMessage) {
  log_error(`Error ${errMessage.name}: ${errMessage.message}`);
}

async function handleVideoOfferMsg(msg) {
  console.log('handling video received');
  targetUsername = msg.callername

  console.log('sdp', msg.sdp);

  _this.setState({ currScreen: 'startVideo' });

  var self = _this;
  remotePC = new RTCPeerConnection(configuration);

  mediaDevices.enumerateDevices().then(devices => {
    const isFront = true;

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };


    // var desc = new RTCSessionDescription(msg.sdp);
    log('set remote description callee');
    mediaDevices.getUserMedia(constraints).then((stream) => {
      self.setState({ localStream: stream });

      remotePC.addStream(stream);



      log('set localdesscription');

      var desc = new RTCSessionDescription(msg.sdp);
      remotePC.setRemoteDescription(desc).then(() => {
        remotePC.createAnswer().then((answer) => {
          isConnected = true;
          remotePC.setLocalDescription(answer).then(() => {
            log('create answer');
            log('send video answer')
            log(remotePC.localDescription);
            socket.send({
              type: "video-answer",
              callername: msg.callername,
              from: username,
              sdp: remotePC.localDescription
            })
          });
        });
      });
    });
  });
  remotePC.onicecandidate = event => {
    log("*** ON REMOTE ICE candidate: ");
    if (event.candidate) {
      log("*** Outgoing REMOTE ICE candidate: " + event.candidate);
      if(isConnected){
      socket.send({
        type: "new-ice-candidate",
        target: msg.callername,
        candidate: event.candidate
      });
    }
    }
  };

  remotePC.onaddstream = e => {
    console.log('remotePC tracking with ', e);
    if (e.stream && self.state.remoteStream !== e.stream) {
      console.log('RemotePC received the stream', e.stream);
      _this.setState({ remoteStream: e.stream });
      log(_this.state.remoteStream.toURL())
    }
  };

}
function onLogin(data) {
  console.log('Login');
  if (data.success === false) {
    _this.setState({ message: 'oops...try a different username' });
  } else {
    //var loginContainer = document.getElementById('loginContainer');
    //loginContainer.parentElement.removeChild(loginContainer);
    username = data.username;
    console.log('Login Successfull');
    console.log('logged in as :' + username);
    console.log(data.userlist);
    let toArray = _.keys(data.userlist);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    _this.setState({ currScreen: 'userList', dataSource: ds.cloneWithRows(toArray) });
  }
}

function callAccept(data) {
  console.log('call accepted');
  handleVideoOfferMsg(data);
}

function callReject(data) {
  console.log('call rejected');
  socket.send({
    type: 'call_rejected',
    callername: data.callername,
    from: username,
  });
  busy = false;
  incallwith = '';
}

function handleVideoOffer(data) {
  _this.renderVideo();
  if (busy == false) {
    busy = true;
    incallwith = data.callername;
    //var res = confirm(data.callername+" is calling you");
    Alert.alert(
      'Incoming Call',
      data.callername + ' is calling you',
      [
        { text: 'Cancel', onPress: () => callReject(data), style: 'cancel' },
        { text: 'OK', onPress: () => callAccept(data) },
      ],
      { cancelable: false },
    );
  } else {
    console.log('call busy');
    //this.setState({ callResponse: "Call accepted by :"+ data.responsefrom })
    socket.send({
      type: 'call_busy',
      callername: data.callername,
      from: username,
    });
  }
}

async function handleVideoAnswer(data) {
  log(data.sdp);
  var desc = new RTCSessionDescription(data.sdp);
  await localPC.setRemoteDescription(desc);
  isConnected = true;
  localICECandidates.forEach(candidate => {
    socket.send({
      type: "new-ice-candidate",
      target: data.responsefrom,
      candidate: candidate
    });
  });
  localICECandidates = [];
  incallwith = data.responsefrom;
  _this.setState({ callResponse: 'Call accepted by ' + data.responsefrom });
}

async function handleCandidateData(data) {
  var candidate = new RTCIceCandidate(data.candidate);
  log('*** Adding received ICE candidate: ' + data.candidate);
  log('*** Checking candidate: ' + candidate);

  log('localPC ' +localPC);
  log('remotePC ' +remotePC);
  if(candidate){
    log('*** candidate: ' + data.candidate);

    if (localPC)
    {
      await localPC.addIceCandidate(candidate) 
      log('*** localPC Await: ');

    }
    if (remotePC) 
    {
      await remotePC.addIceCandidate(candidate)
      log('*** remotePC Await: ');

    }
  }
}

socket.on('roommessage', function (message) {
  var data = message;
  let currUsers;
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  switch (data.type) {
    case 'login':
      currUsers = _this.state.dataSource._dataBlob['s1'];
      currUsers.push(data.username);
      _this.setState({ dataSource: ds.cloneWithRows(currUsers) });
      console.log('New user : ' + data.username);
      break;
    case 'disconnect':
      currUsers = _this.state.dataSource._dataBlob['s1'];
      currUsers = _.pull(currUsers, data.username);
      _this.setState({ dataSource: ds.cloneWithRows(currUsers) });
      console.log('User disconnected : ' + data.username);
      break;
    default:
      break;
  }
});
socket.on('message', function (message) {
  var data = message;
  _this.setState({ callResponse: '' });
  switch (data.type) {
    case 'login':
      onLogin(data);
      break;
    case 'handleVideoOffer':
      console.log('getting called');
      handleVideoOffer(data);
      break;
    case 'handlecandidate':
      handleCandidateData(data);
      log('handle handleCandidateData');
      break;
    case 'handleVideoAnswer':
      log(data.sdp.type);
      log('handle ans');
      log(data.sdp);
      handleVideoAnswer(data);
      break;
    default:
      break;
  }
});

export default class VideoCall extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      currScreen: 'login',
      text: '',
      message: '',
      callResponse: '',
      dataSource: ds.cloneWithRows([]),
      localStream: null,
      remoteStream: null,
    };
    // the user of which curren video screen has been rendered
    this.currUser = '';
  }

  componentDidMount() {
    _this = this;
  }
  onPressLogin() {
    let username = this.state.text;
    if (username == '') {
      this.setState({ message: 'Please enter Username' });
    } else {
      socket.send({
        type: 'login',
        name: username,
      });
    }
  }
  renderRow(data) {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => this.startVideo(data)}>
          <Text style={styles.text}>{data}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  backtouserList() {
    this.currUser = '';
    this.setState({ currScreen: 'userList', callResponse: '' });
  }

  startVideo(data) {
    //console.warn("Video "+data );
    this.currUser = data;
    this.setState({ currScreen: 'startVideo' });
  }

  callUser() {
    busy = true;
    incallwith = this.currUser;

    log('Setting up a configuration..');

    var self = this;
    const isFront = true;
    localPC = new RTCPeerConnection(configuration);

    mediaDevices.enumerateDevices().then(devices => {
      const facing = isFront ? 'front' : 'environment';
      const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
      const facingMode = isFront ? 'user' : 'environment';
      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode,
          optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
        },
      };
      mediaDevices.getUserMedia(constraints).then(newStream => {
        self.setState({ localStream: newStream });

        localPC.addStream(self.state.localStream);

        localPC.onnegotiationneeded = e => {
          if (localPC.signalingState != 'stable') return;
          localPC.createOffer().then(offer => {
            log('sending offer');
            localPC.setLocalDescription(offer).then(() => {
              log('sending offer');
              socket.send({
                type: 'video_offer',
                name: incallwith,
                callername: username,
                sdp: localPC.localDescription,
              });
            });
          });
        };
      });
    });

    localPC.onicecandidate = event => {
      log('*** ON LOCAL ICE candidate: ');
      if (event.candidate) {
        log('*** Outgoing LOCAL ICE candidate: ' + event.candidate);
        isConnected ? localICECandidates.push(event.candidate) :
        socket.send({
          type: 'new-ice-candidate',
          target: incallwith,
          candidate: event.candidate,
        });
      }
    };


    localPC.onaddstream = e => {
      console.log('localpc tracking with ', e);
      if (e.stream && self.state.remoteStream !== e.stream) {
        console.log('localpc received the stream', e.stream);
        self.setState({ remoteStream: e.stream });
      }
    };
    //  console.log(this.state.localStream)
  }

  switchCamera() {
      const { localStream } = this.state;
      localStream.getVideoTracks().forEach((track) => {
      console.log('Switch Camera');
      track._switchCamera()
      });
  }

  // muteAudio() {
  //   const { localStream } = this.state;
  //   localStream.getAudioTracks()[0].enabled = false;
  // }

  renderVideo() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.backtouserList()}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>{this.currUser}</Text>
          <Text style={styles.toolbarButton} />
        </View>
        <ImageBackground source={require('../../assets/background_dashboard.png')} style={{ flexGrow: 1,alignItems: 'center', paddingTop:50}}>
       
        <TouchableOpacity onPress={()=> this.switchCamera()}>
            <Image source={require('../../assets/switch_camera.png')} style = {styles.ImageClass} />
        </TouchableOpacity>

        <View style={styles.rtcview}>

          {this.state.localStream && <RTCView style={styles.rtc} streamURL={this.state.localStream.toURL()} />}
        </View>

        <View style={styles.rtcview}>
          {this.state.remoteStream && <RTCView style={styles.rtc} streamURL={this.state.remoteStream.toURL()} />}
        </View> 
      
          <Button  onPress={() => this.callUser()} title="Call" color="#81c04d" />
          {/* <Button  onPress={() => this.switchCamera()} title="Switch Camera" color="#81c04d" /> */}

          <Text style={[styles.instructions, { color: 'grey' }]}>{this.state.callResponse}</Text>
          
        </ImageBackground>


      </View>

    );
  }
  renderLogin() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Dashboard')}}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>Make a video call</Text>
          <Text style={styles.toolbarButton} />
        </View>
        <ImageBackground source={require('../../assets/background_dashboard.png')} style={{ flexGrow: 1}}>

        <View style={styles.container}>
          <Text style={styles.instructions}>Enter User Name :</Text>
          <TextInput
            style={{
              padding: 5,
              alignSelf: 'center',
              height: 40,
              width: (width * 80) / 100,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button  style={styles.clickButton} onPress={() => this.onPressLogin()} title="Click" color="#81c04d"/>
          <Text style={styles.instructions}>{this.state.message}</Text>
        </View>
        </ImageBackground>
      </View>
    );
  }
  renderList() {
    return (
      
      <View  style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        
        <View style={styles.toolbar}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Dashboard')}}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>My Contacts</Text>
          <Text style={styles.toolbarButton} />
        </View>
        <ImageBackground source={require('../../assets/background_dashboard.png')} style={{ flexGrow: 1}}>

        <ListView
          style={{marginTop: 0, backgroundColor: '#fff'}}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderRow(rowData)}
        />
        </ImageBackground>
         
      </View>
    );
  }
  render() {
    switch (this.state.currScreen) {
      case 'login':
        return this.renderLogin();
        break;
      case 'userList':
        return this.renderList();
        break;
      case 'startVideo':
        return this.renderVideo();
        break;
      default:
    }
    return this.renderLogin();
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  rowContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  toolbar: {
    backgroundColor: '#33FFFF',   
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarButton: {
    width: 55,
    color: '#000',
    textAlign: 'center',
  },
  clickButton: {
    width: 30,
    padding:10,
    textAlign: 'center',
  },
  toolbarTitle: {
    color: '#000',
    textAlign: 'center',
    //fontWeight: 'bold',
    flex: 1,
  },
  rtcview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '50%',
    backgroundColor: 'transparent',
    marginBottom:10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#ffffff'
  },

  rtc: {
    width: '100%',
    height: '100%',

  },
  ImageClass: {
    height: 40, // Provide your own width, height and frame rate here
    width: 40,
  },
});
