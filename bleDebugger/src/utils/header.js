import React, { useState, useEffect } from 'react';
import {Divider,Menu,Provider} from "react-native-paper"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const header = props => {
    const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
    return (
    <View style={styles.topheader}>
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
  </View>
    )
  };

const styles = StyleSheet.create({
    topheader:{
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        flex:0.1,
      },
      topflexrow:{
        flexDirection:"row"
      },

});

export default header;
