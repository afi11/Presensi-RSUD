import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function InputDatePicker2(props) {
  const {label, value, onPress} = props;
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputLabel}>
        <Icon name="date-range" color={'#A173C6'} size={24} />
        <Text style={styles.labelText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#3B3D42',
    fontSize: 12,
    marginBottom: 8,
  },
  inputLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#A8A2B7',
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    width: '100%',
    fontWeight: 'normal',
    marginBottom: 21,
  },
  labelText: {
    color: '#494949',
    fontSize: 12,
  },
});

export default InputDatePicker2;
