import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function HeaderNotBack() {
  return (
    <View style={styles.rowUserInfo}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  tgl: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  imgUser: {
    position: 'absolute',
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default HeaderNotBack;
