import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

function ButtonDetIzin(props) {
  const {onPress, text, enable} = props;
  return (
    <>
      {enable ? (
        <TouchableOpacity onPress={onPress} style={style.buttonPresensi}>
          <Text style={style.textLogin}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={style.buttonDisablePresensi}>
          <Text style={style.textLogin}>{text}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const active = '#8F50DF';
const disable = '#B185E9';
const style = StyleSheet.create({
  buttonPresensi: {
    backgroundColor: active,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 8,
    marginRight: 4,
    marginTop: 10,
  },
  buttonDisablePresensi: {
    backgroundColor: disable,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 8,
    marginRight: 4,
    marginTop: 10,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ButtonDetIzin;
