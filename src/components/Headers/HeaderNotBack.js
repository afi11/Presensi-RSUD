import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import moment from 'moment';
import {urlAssetImageProfil} from '../../config';

function HeaderNotBack({imgProfil}) {
  return (
    <View style={styles.rowUserInfo}>
      <Text style={styles.tgl}>{moment().format('D MMMM YYYY')}</Text>
      <Image
        style={styles.imgUser}
        source={{uri: urlAssetImageProfil + imgProfil}}
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
