import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

function ButtonBatalIzin(props) {
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

const disable = '#B185E9';
const style = StyleSheet.create({
  buttonPresensi: {
    backgroundColor: '#D9D9D9',
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
    marginTop: 10,
    marginRight: 4,
  },
  textLogin: {
    color: '#353238',
    fontSize: 16,
  },
});

export default ButtonBatalIzin;
