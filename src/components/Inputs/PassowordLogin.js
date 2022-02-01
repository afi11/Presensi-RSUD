import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function PasswordLogin(props) {
  const {placeHolder, onChange} = props;
  return (
    <View style={style.containerPassword}>
      <TextInput
        style={style.inputLogin}
        onChangeText={onChange}
        secureTextEntry={true}
        placeholder={placeHolder}
      />
      <Icon name="eye" style={style.iconPassword} size={30} />
    </View>
  );
}

const style = StyleSheet.create({
  containerPassword: {
    flexDirection: 'row',
    borderColor: '#A8A2B7',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    marginBottom: 21,
  },
  inputLogin: {
    padding: 10,
    color: '#AAAAAA',
    fontSize: 18,
    fontWeight: 'normal',
  },
  iconPassword: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default PasswordLogin;
