import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

function ButtonLogin(props) {
  const {onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={style.buttonLogin}>
      <Text style={style.textLogin}>Masuk</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  buttonLogin: {
    backgroundColor: '#8F50DF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
    marginTop: 29,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ButtonLogin;
