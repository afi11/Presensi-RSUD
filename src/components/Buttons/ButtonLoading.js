import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

function ButtonLoading(props) {
  const {tulisan} = props;
  return (
    <>
      <TouchableOpacity style={style.buttonPresensi}>
        <ActivityIndicator size="small" color="#fff" />
        <Text style={style.textLogin}>{tulisan}</Text>
      </TouchableOpacity>
    </>
  );
}

const style = StyleSheet.create({
  buttonPresensi: {
    backgroundColor: '#545454',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    // SHADOW
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    flexDirection: 'row',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 8
  },
});

export default ButtonLoading;
