import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  CardLate,
  CardNotLate,
  CardRiwayatPresensi,
  HeaderNotBack,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getUserId} from '../../config';
import {
  fetchHistoryPresensiMinggu,
  fetchHistoryPresensiBulan,
  getProfilData,
} from '../../redux';

const mingguIni = () => {
  const [refreshing, setRefreshing] = useState(true);
  const navigation = useNavigation();
  const focused = useIsFocused();
  const gotoScreen = screen => {
    navigation.navigate(screen);
  };

  const historyPresensi = useSelector(state => state.historyPresensi);

  const dispatch = useDispatch();

  const onRefresh = () => {
    getUserId().then(res => {
      dispatch(fetchHistoryPresensiMinggu(res));
      setRefreshing(false);
    });
  };

  useEffect(() => {
    getUserId().then(res => {
      dispatch(fetchHistoryPresensiMinggu(res));
      setRefreshing(false);
    });
  }, [focused]);

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 20,
        }}>
        <CardNotLate nTepat={historyPresensi.nTepatMinggu} />
        <CardLate nTelat={historyPresensi.nTelatMinggu} />
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
        <TouchableOpacity onPress={() => gotoScreen('AllPresensi')}>
          <Text style={{color: '#A173C6', fontSize: 16, fontWeight: '500'}}>
            Lihat Semua
          </Text>
        </TouchableOpacity>
      </View>
      {historyPresensi.historyPresensiMinggu.length > 0 ? (
        <FlatList
          data={historyPresensi.historyPresensiMinggu}
          renderItem={({item}) => (
            <CardRiwayatPresensi
              tanggalPresensi={item.tanggalPresensi}
              telat={
                item.idRuleTelatMasuk != null || item.idRuleLewatPulang != null
                  ? true
                  : false
              }
              jamMasuk={
                item.jamMasuk +
                ' - ' +
                (item.telatMasuk != null ? item.telatMasuk : 'Tepat')
              }
              jamPulang={
                item.jamPulang +
                ' - ' +
                (item.telatPulang != null ? item.telatPulang : 'Tepat')
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={{fontSize: 16, textAlign: 'center', color: '#A173C6'}}>
          Tidak Ada Riwayat Presensi
        </Text>
      )}
    </>
  );
};

const bulanIni = () => {
  const historyPresensi = useSelector(state => state.historyPresensi);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserId().then(res => {
      dispatch(fetchHistoryPresensiBulan(res));
    });
  }, []);

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 20,
        }}>
        <CardNotLate nTepat={historyPresensi.nTepatBulan} />
        <CardLate nTelat={historyPresensi.nTelatBulan} />
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
      </View>

      <FlatList
        data={historyPresensi.historyPresensiBulan}
        renderItem={({item}) => (
          <CardRiwayatPresensi
            tanggalPresensi={item.tanggalPresensi}
            telat={
              item.idRuleTelatMasuk != null || item.idRuleLewatPulang != null
                ? true
                : false
            }
            jamMasuk={
              item.jamMasuk +
              ' - ' +
              (item.telatMasuk != null ? item.telatMasuk : 'Tepat')
            }
            jamPulang={
              item.jamPulang +
              ' - ' +
              (item.telatPulang != null ? item.telatPulang : 'Tepat')
            }
          />
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

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
  const isDarkMode = useColorScheme() === 'dark';
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'mingguIni', title: 'Minggu Ini'},
    {key: 'bulanIni', title: 'Bulan Ini'},
  ]);

  useEffect(() => {
    getUserId().then(res => {
      dispatch(getProfilData(res));
    });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderNotBack imgProfil={auth.profil.foto_pegawai} />
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
  header: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});
