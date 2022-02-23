import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { urlAssetImageProfil } from '../../config';

function HeaderWithBack({goBack, title, imgProfil}) {
  return (
    <View style={styles.rowUserInfo}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="arrow-back" size={32} color={'#8F50DF'} />
      </TouchableOpacity>
      <Text style={styles.tgl}>
        {' '}
        {title != null ? title : moment().format('D MMMM YYYY')}
      </Text>
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
