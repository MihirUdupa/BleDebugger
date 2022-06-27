import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid,
  Image,
  Switch,
  TouchableOpacity
} from 'react-native';
import Header from '../utils/header'
import BleManager from 'react-native-ble-manager';
import {Divider,Menu,Provider} from "react-native-paper"
import FontStyles from '../utils/fontsHelper';
import TransactionScreen from './transaction';
import Icon from 'react-native-vector-icons/Ionicons';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = props => {
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);
  const [SUUID, setSUUID] = useState('');
  const [CUUIDWrite, setCUUIDW] = useState(''); // UUID for the write operation
  const [CUUIDRead, setCUUIDR] = useState(''); // UUID for the Read Operation
  const [ConnectStatus, setConnectStatus] = useState(false); //setting the connect status
  const [Id, setId] = useState('');
  const [DeviceName, setDeviceName] = useState('');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const StartScan = () => {
    BleManager.start()
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });

      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
    if (isScanning == false) {
      BleManager.scan([], 5, true)
        .then(res => {
          console.log('Scanning...');
          ToastAndroid.showWithGravity('Scanning ....',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
          setIsScanning(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleStopScan = () => {
    console.log('Scan is stopped');
    ToastAndroid.show('Scan is stopped',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    setIsScanning(false);
  };

  const handleDisconnectedPeripheral = data => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
    ToastAndroid.show('Disconnected from ' + data.peripheral,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  };

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected peripherals');
        ToastAndroid.show('No connected peripherals',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  };

  const handleDiscoverPeripheral = peripheral => {
    // console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'Unknown Device';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  const handleUpdateValueForCharacteristic = data => {
    console.log(
      'Received data from ' +
        data.peripheral +
        ' characteristic ' +
        data.characteristic,
      data.value,
    );
  };

  const testPeripheral = peripheral => {
    if (peripheral) {
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id);
      } else {
        BleManager.connect(peripheral.id)
          .then(() => {
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              setList(Array.from(peripherals.values()));
            }
            console.log('Connected to ' + peripheral.id);
            ToastAndroid.show('Connected to' + peripheral.name,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            setConnectStatus(true);
            setId(peripheral.id);
            setDeviceName(peripheral.name)
          })
          .catch(error => {
            ToastAndroid.show('Connection error \n Please try again after Some time',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            console.log('Connection error', error);
          });
      }
    }
  };

  const Disconnect = id => {
    BleManager.disconnect(id);
    setConnectStatus(false)
  };

  useEffect(() => {
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );
    return () => {
      console.log('unmount');
      bleManagerEmitter.removeAllListeners(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
      bleManagerEmitter.removeAllListeners(
        'BleManagerStopScan',
        handleStopScan,
      );
      bleManagerEmitter.removeAllListeners(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      );
      bleManagerEmitter.removeAllListeners(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      );
    };
  }, []);

  const renderItem = (item, props) => {
    return (
      <>
        <TouchableHighlight onPress={() => testPeripheral(item, props)} style={[FontStyles.black_colour]}>
            <View>
            <Text style={[FontStyles.slaboText, FontStyles.listItemName,FontStyles.redcolour]}>
              {item.name}
            </Text>
            <Text style={[FontStyles.slaboText, FontStyles.listItemRSSI,FontStyles.redcolour]}>
              RSSI: {item.rssi}
            </Text>
            <Text style={[FontStyles.slaboText, FontStyles.listItemId,FontStyles.redcolour]}>
              {item.id}
            </Text>
          </View>
        </TouchableHighlight>
        <Divider/>
      </>
    );
  };

  return (
    <>
      {ConnectStatus ? (
        <TransactionScreen op={Disconnect} id={Id} name={DeviceName} />
      ) : (
        <>
          <View style={styles.body}>
            <Header />
            {/* <View style={styles.topheader}>
              <View style={styles.topflexrow}>
              <View>
              <Provider>
                <View
                  style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<TouchableOpacity onPress={openMenu}><Icon name="menu" size={20} color="#E83B20" /></TouchableOpacity>}>
                    <Menu.Item onPress={() => {closeMenu}} title="Help" />
                    <Divider />
                    <Menu.Item onPress={() => {closeMenu}} title="Logout" />
                  </Menu>
                </View>
              </Provider>
              </View>
              <View>
                <Image source={require('../../assets/image2.png')} />
              </View>
              </View>
            </View> */}
            <View style={styles.flex}>
              <FlatList
                data={list}
                renderItem={({item}) => renderItem(item, props)}
                keyExtractor={item => item.id}
              />
            </View>
            <View styles={styles.background}>
              <TouchableOpacity
                onPress={() => StartScan()} style={styles.scanbtn}>
                  {isScanning ? ( <Text style={styles.buttontext}>Scan Bluetooth(ON)</Text>) : (<Text style={styles.buttontext}>Scan Bluetooth(OFF)</Text>)} 
            </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => StartScan()} style={styles.scanbtn2}>
                <Text style={styles.buttontext}>RETRIVE CONNECTED PERIPHERALS</Text>
            </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: '#FFF',
    backgroundColor:'#000',
  },
  flex:{
    flex:0.8
  },
  background:{
    backgroundColor:'#000',
    
  },
  // topheader:{
  //   alignContent:'center',
  //   alignSelf:'center',
  //   alignItems:'center',
  //   flex:0.1,
  // },
  // topflexrow:{
  //   flexDirection:"row"
  // },
  scanbtn:{
    backgroundColor:'#000',
    borderWidth:3,
    borderColor:'#E83B20', 
    alignSelf:'center',
    alignItems:'center',
    width:'80%',
    margin:"1%",
    borderTopLeftRadius:20
  },
  scanbtn2:{
    backgroundColor:'#000',
    borderWidth:3,
    borderColor:'#E83B20',
    width:'80%',
    alignSelf:'center',
    alignItems:'center',
    margin:"1%",
    borderBottomRightRadius:20
  },
  buttontext:{
    fontSize:15,
    color:'#E83B20'
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex:1,
    backgroundColor:'#000'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;
