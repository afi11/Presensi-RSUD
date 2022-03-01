import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderNotBack, MenuProfil, MenuProfilLogout} from '../../components';
import {getUserId, urlAssetImageProfil} from '../../config';
import {getProfilData} from '../../redux';

export default function Akun({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const gotoScreen = screen => {
    navigation.navigate(screen);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      RNRestart.Restart();
    } catch (error) {
      // Error retrieving data
    }
  };

  const removeDataUser = () => {
    logout();
    RNRestart.Restart;
  };

  useEffect(() => {
    getUserId().then(res => {
      dispatch(getProfilData(res));
    });
  }, []);

  return (
    <ScrollView
      style={styles.scrollBg}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <HeaderNotBack />
        <View style={styles.rowUserInfo}>
          <View style={styles.userInfo}>
            <Image
              style={styles.imgUser}
              source={{uri: urlAssetImageProfil + auth.profil.foto_pegawai}}
            />
            <Text style={styles.userName}>{auth.profil.nama}</Text>
            <Text style={styles.jabatan}>{auth.profil.jabatan}</Text>
          </View>
          <Text style={styles.menuUtama}>Menu Utama</Text>
          <MenuProfil
            iconName="user"
            linkName="Edit Profil"
            gotoScreen={() =>
              navigation.navigate('EditAkun', {
                nama: auth.profil.nama,
                nik: auth.profil.nik,
                email: auth.profil.email,
                foto: auth.profil.foto_pegawai,
              })
            }
          />
          {/* <MenuProfil iconName="gear" linkName="Pengaturan" gotoScreen={null} />
          <MenuProfil
            iconName="info-circle"
            linkName="Tentang Aplikasi"
            gotoScreen={null}
          /> */}
          <MenuProfilLogout
            iconName="sign-out"
            linkName="Keluar"
            logout={logout}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBg: {
    backgroundColor: '#FAFAFE',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#FAFAFE',
  },
  rowUserInfo: {
    padding: 16,
  },
  userInfo: {
    backgroundColor: '#F1E1FD',
    borderRadius: 15,
    padding: 8,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgUser: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  userName: {
    color: '#17181B',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  jabatan: {
    color: '#3B3D42',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
    marginBottom: 16,
  },
  menuUtama: {
    color: '#3D3442',
    fontSize: 18,
    marginTop: 18,
    marginBottom: 24,
    fontWeight: '600',
  },
});
