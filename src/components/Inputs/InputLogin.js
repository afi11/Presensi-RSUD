import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

function InputLogin(props) {
  const {placeHolder, inputType, onChange} = props;
  return (
    <TextInput
      style={style.inputLogin}
      onChangeText={e => onChange(e, inputType)}
      placeholder={placeHolder}
    />
  );
}

const style = StyleSheet.create({
  inputLogin: {
    borderColor: '#A8A2B7',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    color: '#AAAAAA',
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 21,
  },
});

export default InputLogin;
