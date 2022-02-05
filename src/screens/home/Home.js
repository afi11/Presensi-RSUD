import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {ButtonPresensi} from '../../components';

export default function Home() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={true}
        userLocationUpdateInterval={5000}
        zoomEnabled={true}
        zoomControlEnabled={false}
        followsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: -7.839502,
          longitude: 112.031919,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{latitude: -7.839502, longitude: 112.031919}}
          title={'RSUD Gambiran Kota Kediri'}
          description={'Lokasi Presensi'}
        />
        <MapView.Circle
          center={{
            latitude: -7.839502,
            longitude: 112.031919,
          }}
          radius={100}
          strokeWidth={2}
          strokeColor="#8F50DF"
          fillColor="rgba(186, 39, 245, 0.1)"
        />
      </MapView>
      <View style={styles.presensiInfo}>
        <View style={styles.containerPresensi}>
          <Text style={styles.header1}>Lokasi</Text>
          <Text style={styles.header2}>
            Jl. Kapten Tendean No.16, Pakunden, Kec. Pesantren, Kota Kedir
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.header1}>Masuk</Text>
              <Text style={styles.late}>07:15:00</Text>
            </View>
            <View>
              <Text style={styles.header1}>Pulang</Text>
              <Text style={styles.notlate}>15:45:00</Text>
            </View>
          </View>
          <ButtonPresensi onPress={null} text="Absen Masuk Sekarang" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  presensiInfo: {
    width: '100%',
    padding: 18,
  },
  containerPresensi: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  header1: {
    color: '#17181B',
    fontSize: 16,
    fontWeight: '700',
  },
  late: {
    color: '#BB3A3A',
    fontSize: 16,
    fontWeight: '700',
  },
  notlate: {
    color: '#4CBB3A',
    fontSize: 16,
    fontWeight: '700',
  },
  header2: {
    color: '#707480',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 8,
    marginBottom: 8,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
});
