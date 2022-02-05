import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function HeaderWithBack({goBack}) {
  return (
    <View style={styles.rowUserInfo}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="arrow-back" size={32} color={'#8F50DF'} />
      </TouchableOpacity>
      <Text style={styles.tgl}>Rabu, 02 Febuari 2022</Text>
      <Image
        style={styles.imgUser}
        source={require('../../assets/images/jenny-sayang.jpg')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowUserInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tgl: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default HeaderWithBack;
