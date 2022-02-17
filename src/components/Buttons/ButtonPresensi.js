import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

function ButtonPresensi(props) {
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
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    // SHADOW
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonDisablePresensi: {
    backgroundColor: disable,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    // SHADOW
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ButtonPresensi;
