import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CardLate() {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Icon name="check-box" color={'#CC7C42'} size={24} />
      </View>
      <Text style={styles.text1}>Absen Terlambat</Text>
      <Text style={styles.text2}>15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: '#F9F6E8',
    padding: 8,
    borderRadius: 15,
    marginRight: 8,
  },
  circle: {
    width: 40,
    borderRadius: 15,
    borderColor: '#CC7C42',
    borderWidth: 2,
    padding: 6,
  },
  text1: {
    color: '#707480',
    fontSize: 16,
    marginTop: 6,
  },
  text2: {
    color: '#17181B',
    fontSize: 20,
    marginTop: 6,
    fontWeight: '700',
  },
});

export default CardLate;
