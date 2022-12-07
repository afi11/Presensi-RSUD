import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  StatusBar,
  useColorScheme,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {CameraScreen} from 'react-native-camera-kit';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';
import {ButtonLoading, ButtonPresensi} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Snackbar} from 'react-native-paper';
import {
  fetchDataPresensi,
  putFormLokasiPresensi,
  putShiftId,
  putWaktuPresensiShift,
  putWaktuPresensiUser,
  setQRCode,
  setTimePresensiShift,
} from '../../redux';
import {genDateNow, getTimeNow, getUserId} from '../../config';
import {POST_DATA} from '../../services';

export default function Home() {
  const isDarkMode = useColorScheme() === 'dark';
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleFailed, setVisibleFailed] = useState(false);

  const onShowSnackBarSuccess = () => setVisibleSuccess(true);
  const onShowSnackBarFailed = () => setVisibleFailed(true);

  const onDismissSnackBarSuccess = () => setVisibleSuccess(false);
  const onDismissSnackBarFailed = () => setVisibleFailed(false);

  const presensi = useSelector(state => state.presensi);
  const dispatch = useDispatch();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(5000).then(() => {
      getOneTimeLocation();
      subscribeLocationLocation();
      getUserId().then(res => {
        dispatch(
          fetchDataPresensi(res, genDateNow(), presensi.activityCodePresensi),
        );
      });
      setRefreshing(false);
    });
  }, []);

  const onBarcodeScan = result => {
    setQrvalue(result);
    setOpneScanner(false);
    if (parseInt(presensi.storePresensi.jarakPresensi) <= 80) {
      dispatch(setQRCode(result));
      startPresensi(result);
      // if (result == 'seEfxclnPIieWtoF9rjrR2d7jb2Af0ALDnCRCe+PyLY=') {
      //   startPresensi();
      // } else {
      //   setError('QR Code tidak dikenali');
      //   onShowSnackBarFailed();
      // }
    } else {
      setError('Silahkan absen pada area RSUD GAMBIRAN ');
      onShowSnackBarFailed();
    }
  };

  // CHANGE VALUE SELECT BOX JADWAL SHIFT
  const changeValueShift = e => {
    var _FOUND = presensi.presensi.find(function (row, index) {
      if (row.id == e) return true;
    });
    dispatch(putShiftId(e));
    dispatch(setTimePresensiShift(_FOUND));
    if (presensi.storePresensi.tipePresensi != null) {
      if (presensi.storePresensi.tipePresensi == 'jam-masuk') {
        dispatch(
          putWaktuPresensiShift(
            _FOUND.id,
            _FOUND.shift,
            _FOUND.jam_mulai_masuk,
            _FOUND.jam_akhir_masuk,
          ),
        );
      } else {
        dispatch(
          putWaktuPresensiShift(
            _FOUND.id,
            _FOUND.shift,
            _FOUND.jam_awal_pulang,
            _FOUND.jam_akhir_pulang,
          ),
        );
      }
    }
  };

  const onOpneScanner = () => {
    dispatch(putWaktuPresensiUser(getTimeNow()));
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

  // FETCH WAKTU PRESENSI
  useEffect(() => {
    getUserId().then(res => {
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
        dispatch(
          putFormLokasiPresensi(
            jarakPresensi,
            currentLatitude,
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

        dispatch(
          putFormLokasiPresensi(
            jarakPresensi,
            currentLatitude,
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

  const startPresensi = qr => {
    // console.log(qr);
    // console.log(presensi.storePresensi);
    if (presensi.storePresensi.tipeWaktu != 'shift') {
      setLoading(true);
      POST_DATA(`/send-presensi-v2/${qr}`, presensi.storePresensi)
        .then(res => {
          setLoading(false);
          //console.log(res);
          setSuccess(res.message);
          if (res.code == 200) {
            getUserId().then(res => {
              //console.log(res);
              dispatch(
                fetchDataPresensi(
                  res,
                  genDateNow(),
                  presensi.activityCodePresensi,
                ),
              );
              onShowSnackBarSuccess();
            });
          } else {
            setError('QR Code tidak dikenali');
            onShowSnackBarFailed();
          }
        })
        .catch(err => {
          //console.log(err);
          //setError(err);
          onShowSnackBarFailed();
        });
    } else {
      if (presensi.storePresensi.tipeWaktu == 'shift') {
        if (presensi.storePresensi.idWaktu != null) {
          POST_DATA(`/send-presensi-v2/${qr}`, presensi.storePresensi)
            .then(res => {
              setLoading(false);
              console.log(res);
              setSuccess(res.message);
              if (res.code == 200) {
                getUserId().then(res => {
                  console.log(res);
                  dispatch(
                    fetchDataPresensi(
                      res,
                      genDateNow(),
                      presensi.activityCodePresensi,
                    ),
                  );
                  onShowSnackBarSuccess();
                });
              } else {
                setError('QR Code tidak dikenali');
                onShowSnackBarFailed();
              }
            })
            .catch(err => {
              console.log(err);
              //setError(err);
              onShowSnackBarFailed();
            });
        } else {
          alert('Jadwal Shift Harus Dipilih');
        }
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      {opneScanner ? (
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', padding: 8}}>
            <TouchableOpacity onPress={() => setOpneScanner(false)}>
              <Icon name="close" color={'#8F50DF'} size={32} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text style={{color: '#8F50DF', fontSize: 18, marginLeft: 10}}>
                Scan QRCode Absensi
              </Text>
            </View>
          </View>
          <CameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={'blue'}
            frameColor={'yellow'}
            colorForScannerFrame={'black'}
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
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
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
              strokeColor={
                presensi.storePresensi.jarakPresensi == null
                  ? '#f94a4a'
                  : presensi.storePresensi.jarakPresensi <= 80
                  ? '#14ad54'
                  : '#f94a4a'
              }
              fillColor={
                presensi.storePresensi.jarakPresensi == null
                  ? 'rgba(234, 61, 61, 0.3)'
                  : presensi.storePresensi.jarakPresensi <= 80
                  ? 'rgba(96, 209, 127, 0.3)'
                  : 'rgba(234, 61, 61, 0.3)'
              }
            />
          </MapView>
          <ScrollView
            style={styles.presensiInfo}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View
              style={
                presensi.storePresensi.tipeWaktu != 'shift'
                  ? styles.containerPresensi
                  : styles.containerPresensiShift
              }>
              <Text style={{color: '#000', fontSize: 12, textAlign: 'center'}}>
                Tarik ke bawah untuk refresh lokasi
              </Text>
              <Text style={styles.header}>Lokasi</Text>
              <Text style={styles.header2}>
                Jl. Kapten Tendean No.16, Pakunden, Kec. Pesantren, Kota Kediri
              </Text>
              <View style={styles.row}>
                <Text style={styles.header}>Tanggal</Text>
                <Text style={styles.header1}>{presensi.tglPresensi}</Text>
              </View>
              <View style={styles.marginBottom}></View>
              {presensi.storePresensi.tipeWaktu != 'shift' ? (
                <View style={styles.column}>
                  <Text style={styles.header}>
                    Jam Absensi{' '}
                    {presensi.storePresensi.tipePresensi == 'jam-masuk'
                      ? 'Masuk'
                      : 'Pulang'}
                  </Text>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.header1}>Mulai</Text>
                      <Text style={styles.info}>
                        {presensi.presensi != null
                          ? presensi.storePresensi.tipePresensi == 'jam-masuk'
                            ? presensi.presensi.jam_mulai_masuk
                            : presensi.presensi.jam_awal_pulang
                          : ''}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.header1}>Akhir</Text>
                      <Text style={styles.info}>
                        {presensi.presensi != null
                          ? presensi.storePresensi.tipePresensi == 'jam-masuk'
                            ? presensi.presensi.jam_akhir_masuk
                            : presensi.presensi.jam_akhir_pulang
                          : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.column}>
                  <Text style={styles.header}>
                    Jam Presensi{' '}
                    {presensi.storePresensi.tipePresensi == 'jam-masuk'
                      ? 'Masuk'
                      : 'Pulang'}
                  </Text>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.header1}>Mulai</Text>
                      {presensi.storePresensi.activityCode != null ? (
                        <Text style={styles.info}>
                          {presensi.presensi != null
                            ? presensi.storePresensi.tipePresensi == 'jam-masuk'
                              ? presensi.presensi[0].jam_mulai_masuk
                              : presensi.presensi[0].jam_awal_pulang
                            : ''}
                        </Text>
                      ) : (
                        <Text style={styles.info}>
                          {presensi.timePresensiShift.jam_mulai_masuk}
                        </Text>
                      )}
                    </View>
                    <View>
                      <Text style={styles.header1}>Akhir</Text>
                      {presensi.storePresensi.activityCode != null ? (
                        <Text style={styles.info}>
                          {presensi.presensi != null
                            ? presensi.storePresensi.tipePresensi == 'jam-masuk'
                              ? presensi.presensi[0].jam_akhir_masuk
                              : presensi.presensi[0].jam_akhir_pulang
                            : presensi.timePresensiShift.jam_akhir_pulang}
                        </Text>
                      ) : (
                        <Text style={styles.info}>
                          {presensi.storePresensi.tipePresensi == 'jam-masuk'
                            ? presensi.timePresensiShift.jam_akhir_masuk
                            : presensi.timePresensiShift.jam_akhir_pulang}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.marginBottom}></View>
              {/* <View>
                <Text style={styles.header}>Hasil Presensi</Text>
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
              </View> */}

              {presensi.storePresensi.tipeWaktu == 'shift' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={styles.header}>Jadwal Shift</Text>
                  <View style={styles.selectJadwal}>
                    {presensi.presensi != null ? (
                      <Picker
                        enabled={true}
                        selectedValue={presensi.storePresensi.idWaktu}
                        mode="dialog"
                        style={{
                          color: '#000',
                          marginLeft: 6,
                          marginVertical: -5,
                        }}
                        onValueChange={e => changeValueShift(e)}>
                        {presensi.presensi.map(row => (
                          <Picker.Item
                            color={isDarkMode ? '#FFF' : '#000'}
                            label={row.shift}
                            value={row.id}
                          />
                        ))}
                      </Picker>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              ) : (
                <></>
              )}

              <View style={styles.marginBottom}></View>
              {presensi.isAbleToPresensi ? (
                loading ? (
                  <ButtonLoading tulisan="Loading..." />
                ) : (
                  <ButtonPresensi
                    onPress={onOpneScanner}
                    enable={true}
                    text={
                      presensi.storePresensi.tipePresensi == 'jam-masuk'
                        ? 'Absen Masuk Sekarang '
                        : 'Absen Pulang Sekarang'
                    }
                  />
                )
              ) : loading ? (
                <ButtonLoading tulisan="Loading..." />
              ) : (
                <ButtonPresensi
                  onPress={onOpneScanner}
                  enable={false}
                  text={
                    presensi.storePresensi.tipePresensi == 'jam-masuk'
                      ? 'Absen Masuk Sekarang '
                      : 'Absen Pulang Sekarang'
                  }
                />
              )}
            </View>
            <View style={{alignItems: 'center'}}>
              <Snackbar
                visible={visibleSuccess}
                onDismiss={onDismissSnackBarSuccess}
                style={{backgroundColor: '#0bc663'}}>
                <Text style={{color: '#fff', fontSize: 18}}>
                  {success}
                </Text>
              </Snackbar>
              <Snackbar
                visible={visibleFailed}
                onDismiss={onDismissSnackBarFailed}
                style={{backgroundColor: '#cc1616'}}>
                <Text style={{color: '#fff', fontSize: 18}}>{error}</Text>
              </Snackbar>
            </View>
          </ScrollView>
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
    marginBottom: 16,
    bottom: 0,
    position: 'absolute',
  },
  containerPresensi: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    elevation: 4,
  },
  containerPresensiShift: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    elevation: 4,
  },
  header: {
    color: '#17181B',
    fontSize: 16,
    fontWeight: '700',
  },
  header1: {
    color: '#17181B',
    fontSize: 16,
    fontWeight: '400',
  },
  marginBottom: {
    marginBottom: 12,
  },
  late: {
    color: '#BB3A3A',
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    color: '#8F50DF',
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
  selectJadwal: {
    borderColor: '#A884D8',
    borderWidth: 1,
    width: 150,
    borderRadius: 8,
    marginLeft: 16,
    padding: -20,
  },
});
