import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderNotBack} from '../../components';
import {ButtonAjukanIzin} from '../../components/Buttons';
import {getUserId} from '../../config';
import {getProfilData} from '../../redux';

const Cuti = () => {
  const auth = useSelector(state => state.auth);
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
  return (
    <View style={styles.container}>
      <HeaderNotBack imgProfil={auth.profil.foto_pegawai} />
      <View style={styles.containerHeader}>
        <ButtonAjukanIzin
          onPress={() => gotoScreen('TambahCuti')}
          text="Ajukan Izin"
        />
      </View>
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
