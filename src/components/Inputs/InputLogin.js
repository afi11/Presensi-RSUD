import React from 'react';
import {TextInput, StyleSheet, Text, View} from 'react-native';

function InputLogin(props) {
  const {placeHolder, inputType, onChange} = props;
  return (
    <View style={style.column}>
      <Text style={style.text}>Username</Text>
      <TextInput
        style={style.inputLogin}
        onChangeText={e => onChange(e, inputType)}
        placeholder={placeHolder}
      />
    </View>
  );
}

const style = StyleSheet.create({
  column: {
    flexDirection: 'column',
    width: '100%',
  },
  text: {
    color: '#595959',
    fontSize: 21,
    marginBottom: 4,
  },
  inputLogin: {
    borderColor: '#A8A2B7',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    color: '#3d3d3d',
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 21,
  },
});

export default InputLogin;
