import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CardRiwayatIzin, HeaderNotBack} from '../../components';
import {ButtonAjukanIzin} from '../../components/Buttons';
import {getUserId} from '../../config';
import {fetchIzinData, getProfilData} from '../../redux';

const Cuti = () => {
  const auth = useSelector(state => state.auth);
  const izin = useSelector(state => state.izin);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const gotoScreen = screen => {
    navigation.navigate(screen, {
      nama: auth.profil.nama,
      nik: auth.profil.nik,
      jabatan: auth.profil.jabatan,
      namaDivisi: auth.profil.namaDivisi,
    });
  };

  useEffect(() => {
    getUserId().then(res => {
      dispatch(getProfilData(res));
    });
  }, []);

  useEffect(() => {
    getUserId().then(res => {
      dispatch(fetchIzinData(res));
    });
  }, []);
  return (
    <View style={styles.container}>
      <HeaderNotBack title="Izin" imgProfil={auth.profil.foto_pegawai} />
      <View style={styles.containerHeader}>
        <ButtonAjukanIzin
          onPress={() => gotoScreen('TambahCuti')}
          text="Ajukan Izin"
        />
      </View>
      <Text style={{color: '#3D3442', fontSize: 16, fontWeight: '500', marginVertical: 8}}>
        Riwayat Presensi
      </Text>
      <FlatList
        data={izin.izins}
        renderItem={({item}) => (
          <CardRiwayatIzin
            tanggalPresensi={item.tanggalMulaiIzin}
            tanggalSelesai={item.tanggalAkhirIzin}
            alasan={item.namaIzin}
            status={item.statusIzin}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

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
  containerHeader: {
    backgroundColor: '#F1E1FD',
    borderRadius: 15,
    padding: 10,
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default Cuti;
