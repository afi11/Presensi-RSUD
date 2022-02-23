import React from 'react';
import moment from 'moment';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CardRiwayatIzin = ({tanggalPresensi, tanggalSelesai, alasan, status}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.subDate}>
            <Text style={styles.textTgl}>
              {moment(tanggalPresensi).format('MMM')}
            </Text>
            <Text style={styles.textBulan}>
              {moment(tanggalPresensi).format('D')}
            </Text>
          </View>
          <View style={styles.rowDetIzin}>
            <View style={styles.rowIsiIzin}>
              <View style={styles.widthTitle}>
                <Text style={styles.textTitle}>Alasan</Text>
              </View>
              <Text style={styles.textTitle}>: </Text>
              <Text style={styles.textTitle}>{alasan}</Text>
            </View>
            <View style={styles.rowIsiIzin}>
              <View style={styles.widthTitle}>
                <Text style={styles.textTitle}>Status</Text>
              </View>
              <Text style={styles.textTitle}>: </Text>
              <Text style={styles.textTitle}>
                {status == 1
                  ? 'Disetujui'
                  : status == 0
                  ? 'Menunggu Persetujuan'
                  : 'Ditolak'}
              </Text>
            </View>
            <View style={styles.rowIsiIzin}>
              <View style={styles.widthTitle}>
                <Text style={styles.textTitle}>Mulai</Text>
              </View>
              <Text style={styles.textTitle}>: </Text>
              <Text style={styles.textTitle}>
                {moment(tanggalPresensi).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.rowIsiIzin}>
              <View style={styles.widthTitle}>
                <Text style={styles.textTitle}>Selesai</Text>
              </View>
              <Text style={styles.textTitle}>: </Text>
              <Text style={styles.textTitle}>
                {moment(tanggalSelesai).format('DD MMMM YYYY')}
              </Text>
            </View>
          </View>
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
    marginTop: 8,
    flexDirection: 'column',
  },
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    borderLeftColor: '#69D767',
    borderLeftWidth: 8,
    padding: 10,
    borderRadius: 10,
  },
  subDate: {
    width: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textTgl: {
    color: '#A173C6',
    fontSize: 16,
  },
  textBulan: {
    marginTop: -8,
    color: '#A173C6',
    fontSize: 32,
    fontWeight: '500',
  },
  rowDetIzin: {
    flexDirection: 'column',
  },
  rowIsiIzin: {
    flexDirection: 'row',
    width: '100%',
  },
  widthTitle: {
    width: 60,
  },
  textTitle: {
    color: '#3B3D42',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default CardRiwayatIzin;
