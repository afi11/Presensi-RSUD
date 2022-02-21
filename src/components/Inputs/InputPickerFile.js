import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

function InputPickerFile(props) {
  const {label, onPress, fileName} = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={styles.buttonAmbilFile}>
          <Text style={styles.textWhite}>Ambil file</Text>
        </TouchableOpacity>
        <Text style={styles.textFile}>{fileName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#3B3D42',
    fontSize: 18,
    marginBottom: 8,
  },
  buttonAmbilFile: {
    width: 100,
    backgroundColor: '#A173C6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWhite: {
    color: '#fff',
    fontSize: 14,
  },
  textFile: {
    color: '#8D919E',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default InputPickerFile;
