import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function PasswordLogin(props) {
  const {placeHolder, inputType, onChange, hidden, buttonHidden} = props;
  return (
    <View style={style.column}>
      <Text style={style.text}>Password</Text>
      <View style={style.containerPassword}>
        <TextInput
          style={style.inputLogin}
          onChangeText={e => onChange(e, inputType)}
          secureTextEntry={hidden}
          placeholder={placeHolder}
        />
        <TouchableOpacity
          style={style.iconPassword}
          onPress={() => buttonHidden()}>
          <Icon name={hidden ? 'eye' : 'eye-off'} size={30} color={'#4c4a4a'} />
        </TouchableOpacity>
      </View>
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
    color: '#3d3d3d',
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
