import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

function ButtonRadio(props) {
  const {onPress, text, isActive} = props;
  return (
    <>
      {isActive ? (
        <TouchableOpacity onPress={onPress} style={style.buttonActive}>
          <Text style={style.textActive}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} style={style.buttonDisactive}>
          <Text style={style.textDisactive}>{text}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const style = StyleSheet.create({
  buttonActive: {
    backgroundColor: '#8F50DF',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    borderRadius: 20,
    elevation: 4,
    marginHorizontal: 6,
  },
  textActive: {
    color: '#FFF',
    fontSize: 14,
  },
  buttonDisactive: {
    backgroundColor: '#FFF',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    borderRadius: 20,
    elevation: 4,
    marginHorizontal: 6,
  },
  textDisactive: {
    color: '#8F50DF',
    fontSize: 14,
  },
});

export default ButtonRadio;
