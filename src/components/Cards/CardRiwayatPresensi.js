import React from 'react';
import moment from 'moment';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CardRiwayatPresensi = ({tanggalPresensi, telat, jamMasuk, jamPulang}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.textTgl}>
            {moment(tanggalPresensi).format('D MMMM YYYY')}
          </Text>
          {telat ? (
            <View style={styles.rowNotLate}>
              <Text style={styles.textRowNotLate}>Tepat Waktu</Text>
            </View>
          ) : (
            <View style={styles.rowLate}>
              <Text style={styles.textRowLate}>Telat</Text>
            </View>
          )}
        </View>
        <View style={styles.rowDetPresensi}>
          <Text style={styles.textDetPresensi}>Masuk : {jamMasuk} | </Text>
          <Text style={styles.textDetPresensi}>Keluar : {jamPulang}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    borderColor: '#C5C6DA',
    padding: 10,
    flexDirection: 'column',
  },
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTgl: {
    color: '#8B8091',
    fontSize: 14,
    fontWeight: '300',
  },
  rowNotLate: {
    backgroundColor: '#DBF8F0',
    padding: 2,
    borderRadius: 5,
    width: 90,
    alignItems: 'center',
  },
  textRowNotLate: {
    color: '#42CCA9',
  },
  rowLate: {
    backgroundColor: '#F8DBDB',
    padding: 2,
    borderRadius: 5,
    width: 90,
    alignItems: 'center',
  },
  textRowLate: {
    color: '#CC4242',
  },
  rowDetPresensi: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 6,
  },
  textDetPresensi: {
    color: '#3D3442',
    fontSize: 14,
  },
});

export default CardRiwayatPresensi;
