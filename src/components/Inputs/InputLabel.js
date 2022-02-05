import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

function InputLabel(props) {
  const {label, type} = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        secureTextEntry={type != 'password' ? false : true}
        style={styles.inputLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#3B3D42',
    fontSize: 18,
    marginBottom: 8,
  },
  inputLabel: {
    borderColor: '#A8A2B7',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    color: '#AAAAAA',
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 21,
  },
});

export default InputLabel;
