import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {CardLate, CardNotLate, CardRiwayatPresensi} from '../../components';

const mingguIni = () => {
  const [data, setData] = useState([
    {
      tgl: 'Sen, 24 Jan 2022',
      tepatWaktu: true,
      waktuMasuk: '07:24:55',
      waktuPulang: '16:24:55',
    },
    {
      tgl: 'Sen, 24 Jan 2022',
      tepatWaktu: true,
      waktuMasuk: '07:24:55',
      waktuPulang: '16:24:55',
    },
    {
      tgl: 'Sen, 24 Jan 2022',
      tepatWaktu: true,
      waktuMasuk: '07:24:55',
      waktuPulang: '16:24:55',
    },
  ]);

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 20,
        }}>
        <CardNotLate />
        <CardLate />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#3D3442', fontSize: 16, fontWeight: '500'}}>
          Riwayat Presensi
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#A173C6', fontSize: 16, fontWeight: '500'}}>
            Lihat Semua
          </Text>
        </TouchableOpacity>
      </View>
      <CardRiwayatPresensi
        tgl={'Sen, 24 Jan 2022'}
        tepatWaktu={true}
        waktuMasuk={'07:15:00'}
        waktuPulang={'15:45:00'}
      />
      <CardRiwayatPresensi
        tgl={'Sel, 25 Jan 2022'}
        tepatWaktu={false}
        waktuMasuk={'07:45:00'}
        waktuPulang={'15:45:00'}
      />
      <CardRiwayatPresensi
        tgl={'Rab, 26 Jan 2022'}
        tepatWaktu={true}
        waktuMasuk={'07:15:00'}
        waktuPulang={'15:45:00'}
      />
      <CardRiwayatPresensi
        tgl={'Kam, 27 Jan 2022'}
        tepatWaktu={true}
        waktuMasuk={'07:15:00'}
        waktuPulang={'15:45:00'}
      />
      <CardRiwayatPresensi
        tgl={'Jum, 28 Jan 2022'}
        tepatWaktu={true}
        waktuMasuk={'07:15:00'}
        waktuPulang={'15:45:00'}
      />
      {/* <FlatList
        data={data}
        renderItem={(item, index) => (
          <CardRiwayatPresensi
            tgl={item.tgl}
            tepatWaktu={item.tepatWaktu}
            waktuMasuk={item.waktuMasuk}
            waktuPulang={item.waktuPulang}
          />
        )}
      /> */}
    </>
  );
};

const bulanIni = () => (
  <View
    style={{
      width: '100%',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 16,
    }}>
    <CardNotLate />
    <CardLate />
  </View>
);

const renderScene = SceneMap({
  mingguIni: mingguIni,
  bulanIni: bulanIni,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    activeColor={'#A173C6'}
    inactiveColor={'#707480'}
    indicatorStyle={styles.indicatorStyle}
    style={{backgroundColor: '#FAFAFE'}}
  />
);

export default function Presensi() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'mingguIni', title: 'Minggu Ini'},
    {key: 'bulanIni', title: 'Bulan Ini'},
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.rowUserInfo}>
        <Text style={styles.tgl}>Rabu, 02 Febuari 2022</Text>
        <Image
          style={styles.imgUser}
          source={require('../../assets/images/jenny-sayang.jpg')}
        />
      </View>
      <Text style={styles.header}>Rekap Presensi</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#FAFAFE',
  },
  indicatorStyle: {
    backgroundColor: '#A173C6',
    padding: 1.5,
  },
  rowUserInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  tgl: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  imgUser: {
    position: 'absolute',
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
