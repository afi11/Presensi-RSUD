import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

function InputLabel(props) {
  const {
    label,
    type,
    value,
    editable,
    multiLine,
    numberOfLine,
    onChange,
    inputType,
  } = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline={multiLine}
        numberOfLines={numberOfLine}
        secureTextEntry={type != 'password' ? false : true}
        style={styles.inputLabel}
        defaultValue={value}
        editable={editable}
        onChangeText={e => onChange(e, inputType)}
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
    color: '#494949',
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 21,
  },
});

export default InputLabel;
