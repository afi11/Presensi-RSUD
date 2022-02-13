import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';
import {ButtonPresensi} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDataPresensi, putFormLokasiPresensi, putWaktuPresensiUser} from '../../redux';
import {genDateNow, getTimeNow, getUserId} from '../../config';

export default function Home() {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  const presensi = useSelector(state => state.presensi);
  const dispatch = useDispatch();

  const onBarcodeScan = result => {
    setQrvalue(result);
    console.log(result);
    setOpneScanner(false);
    dispatch(putWaktuPresensiUser(getTimeNow()));
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  // COUNT DISTANCE
  const calculateDistance = (lat, long) => {
    var dis = getDistance(
      {latitude: lat, longitude: long},
      {latitude: -7.839502, longitude: 112.031919},
    );
    return dis;
  };

  const calculatePreciseDistance = (lat, long) => {
    var pdis = getPreciseDistance(
      {latitude: lat, longitude: long},
      {latitude: -7.839502, longitude: 112.031919},
    );
    console.log(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
  };

  // FETCH WAKTU PRESENSI
  useEffect(() => {
    getUserId().then(res => {
      console.log(res);
      dispatch(
        fetchDataPresensi(res, genDateNow(), presensi.activityCodePresensi),
      );
    });
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        // COUNT DISTANCE
        var jarakPresensi = calculateDistance(
          currentLatitude,
          currentLongitude,
        );
        calculatePreciseDistance(currentLatitude, currentLongitude);
        dispatch(
          putFormLokasiPresensi(
            jarakPresensi,
            currentLongitude,
            currentLongitude,
          ),
        );

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        console.log(position);

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        // COUNT DISTANCE
        var jarakPresensi = calculateDistance(
          currentLatitude,
          currentLongitude,
        );
        calculatePreciseDistance(currentLatitude, currentLongitude);

        dispatch(
          putFormLokasiPresensi(
            jarakPresensi,
            currentLongitude,
            currentLongitude,
          ),
        );

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {opneScanner ? (
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'column',
          }}>
          <Icon
            name="close"
            size={36}
            color={'#8F50DF'}
            onPress={() => setOpneScanner(false)}
          />
          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              fontSize: 24,
            }}>
            Scan QR Code Pada Area Ditentukan
          </Text>
          <CameraScreen
            showFrame={true}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={event =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
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
                  <Text
                    style={
                      presensi.telatMasuk != '00:00:00'
                        ? styles.late
                        : styles.notlate
                    }>
                    {presensi.presensiMasuk != null
                      ? presensi.presensiMasuk
                      : '--:--:--'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.header1}>Pulang</Text>
                  <Text
                    style={
                      presensi.jarakPresensiPulang > 1
                        ? styles.late
                        : styles.notlate
                    }>
                    {presensi.presensiPulang != null
                      ? presensi.presensiPulang
                      : '--:--:--'}
                  </Text>
                </View>
              </View>
              <ButtonPresensi
                onPress={onOpneScanner}
                text="Absen Masuk Sekarang"
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
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
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  barcodeContainer: {
    width: '100%',
    height: '50%',
  },
});
