import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  useColorScheme,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  ButtonRadio,
  CardRiwayatPresensi,
  HeaderWithBack,
  InputDatePicker2,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHistorySemua, getProfilData} from '../../redux';
import {getUserId} from '../../config';
import DatePicker from 'react-native-date-picker';

export default function AllPresensi({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [tglAwal, setTglAwal] = useState('');
  const [tglAkhir, setTglAkhir] = useState('');

  const [isSemua, setSemua] = useState(true);
  const [isFilter, setFilter] = useState(false);
  const [dateAwal, setDateAwal] = useState(new Date());
  const [dateAkhir, setDateAkhir] = useState(new Date());
  const [openAwal, setOpenAwal] = useState(false);
  const [openAkhir, setOpenAkhir] = useState(false);

  const dispatch = useDispatch();
  const historyPresensi = useSelector(state => state.historyPresensi);
  const auth = useSelector(state => state.auth);

  const setButtonFilter = state => {
    if (state == 'semua') {
      setSemua(true);
      setFilter(false);
      getUserId().then(res => {
        dispatch(fetchHistorySemua(res, '', ''));
      });
    } else {
      setFilter(true);
      setSemua(false);
    }
  };

  const openCloseDateAwal = () => {
    setOpenAwal(!openAwal);
  };

  const openCloseDateAkhir = () => {
    setOpenAkhir(!openAkhir);
  };

  const putTanggalToForm = (type, tanggal) => {
    var tgl =
      tanggal.getFullYear() +
      '-' +
      (tanggal.getMonth() + 1) +
      '-' +
      tanggal.getDate();
    if (type == 'tanggalMulai') {
      setDateAwal(tanggal);
      setTglAwal(tgl);
    } else {
      setDateAkhir(tanggal);
      setTglAkhir(tgl);
      getUserId().then(res => {
        dispatch(fetchHistorySemua(res, tglAwal, tglAkhir));
      });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getUserId().then(res => {
      dispatch(getProfilData(res));
    });
  }, []);

  useEffect(() => {
    getUserId().then(res => {
      dispatch(fetchHistorySemua(res, tglAwal, tglAkhir));
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic">
      <HeaderWithBack
        goBack={() => goBack()}
        title="Riwayat Presensi"
        imgProfil={auth.profil.foto_pegawai}
      />
      <View style={{marginBottom: 16, flexDirection: 'row'}}>
        <ButtonRadio
          onPress={() => setButtonFilter('semua')}
          text="Tahun ini"
          isActive={isSemua}
        />
        <ButtonRadio
          onPress={() => setButtonFilter('filter')}
          text="Filter"
          isActive={isFilter}
        />
      </View>
      {isFilter ? (
        <View style={styles.row}>
          <View style={{width: '50%', padding: 2}}>
            <InputDatePicker2
              label="Tanggal Mulai"
              onPress={openCloseDateAwal}
              value={dateAwal.toDateString()}
            />
          </View>
          <View style={{width: '50%', padding: 2}}>
            <InputDatePicker2
              label="Tanggal Akhir"
              onPress={openCloseDateAkhir}
              value={dateAkhir.toDateString()}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
      <Text
        style={{
          color: '#3D3442',
          fontSize: 16,
          fontWeight: '500',
          marginBottom: 16,
          marginLeft: 8,
        }}>
        Riwayat Presensi
      </Text>
      {historyPresensi.historyPresensiFilter.length > 0 ? (
        <FlatList
          data={historyPresensi.historyPresensiFilter}
          renderItem={({item}) => (
            <CardRiwayatPresensi
              tanggalPresensi={item.tanggalPresensi}
              telat={
                item.idRuleTelatMasuk != null || item.idRuleTelatPulang != null
                  ? true
                  : false
              }
              jamMasuk={item.jamMasuk}
              jamPulang={item.jamPulang}
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={{fontSize: 16, textAlign: 'center', color: '#A173C6'}}>
          Tidak Ada Riwayat Presensi
        </Text>
      )}
      <DatePicker
        modal
        open={openAwal}
        date={dateAwal}
        mode="date"
        textColor={isDarkMode ? '#FFF' : '#000'}
        onConfirm={date => {
          putTanggalToForm('tanggalMulai', date);
          openCloseDateAwal();
        }}
        onCancel={() => {
          openCloseDateAwal();
        }}
      />
      <DatePicker
        modal
        open={openAkhir}
        date={dateAkhir}
        minimumDate={dateAwal}
        mode="date"
        textColor={isDarkMode ? '#FFF' : '#000'}
        onConfirm={date => {
          putTanggalToForm('tanggalAkhir', date);
          openCloseDateAkhir();
        }}
        onCancel={() => {
          openCloseDateAkhir();
        }}
      />
    </ScrollView>
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
  row: {
    flexDirection: 'row',
  },
});
