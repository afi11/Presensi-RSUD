import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

function ButtonAjukanIzin(props) {
  const {onPress, text} = props;
  return (
    <TouchableOpacity onPress={onPress} style={style.buttonPresensi}>
      <Text style={style.textLogin}>{text}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  buttonPresensi: {
    backgroundColor: '#A173C6',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    // SHADOW
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 100,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ButtonAjukanIzin;
