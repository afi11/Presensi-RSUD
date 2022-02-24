import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonLoading, ButtonSimpan, InputLabel} from '../../components';
import {Snackbar} from 'react-native-paper';
import {POST_DATA} from '../../services';

export default function ResetPassword({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState('');
  const [pegawai, setPegawai] = useState(null);
  const [cekakun, setCekAkun] = useState(false);
  const [error, setError] = useState('');
  const [sendemail, setSendEmail] = useState(false);
  const [email, setEmail] = useState({email: ''});

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeInput = (inputValue, inputType) => {
    setEmail({
      ...email,
      [inputType]: inputValue,
    });
  };

  const cekAkun = () => {
    setLoading(true);
    POST_DATA('/cek_akun', email)
      .then(response => {
        console.log(response);
        setLoading(false);
        if (response.data != null) {
          setCekAkun(true);
          setFound(true);
          setMessage('Data Pegawai Ditemukan');
          setPegawai(response.data);
        } else {
          setFound(false);
          setMessage('Data Pegawai Tidak Ditemukan');
        }
      })
      .catch(err => {
        setError(err);
      });
  };

  const sendEmail = () => {
    setLoading(true);
    POST_DATA('/reset_password', email)
      .then(response => {
        console.log(response);
        setLoading(false);
        setMessage(response.message);
        setSendEmail(true);
        bukanAkunSaya();
      })
      .catch(err => {
        setError(err);
      });
  };

  const bukanAkunSaya = () => {
    setMessage('');
    setCekAkun(false);
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-back" size={32} color={'#8F50DF'} />
        </TouchableOpacity>
        <Text style={styles.textResetPassword}>Reset Password</Text>
      </View>
      <View style={styles.containerForm}>
        <InputLabel
          label="Masukkan Email :"
          onChange={e => onChangeInput(e, 'email')}
        />
        {message != '' ? (
          <View style={styles.infoPencarian}>
            {found ? (
              <>
                <Text style={styles.textPencarian}>Data Pegawai Ditemukan</Text>
                <Text style={styles.textPencarian}>
                  Kode : {pegawai != null ? pegawai.code : ''}
                </Text>
                <Text style={styles.textPencarian}>
                  Nama : {pegawai != null ? pegawai.nama : ''}
                </Text>
                <Text style={styles.textPencarian}>
                  NIK : {pegawai != null ? pegawai.nik : ''}
                </Text>
              </>
            ) : (
              <Text style={styles.textPencarian}>{message}</Text>
            )}
            {sendemail ? (
              <Text style={styles.textPencarian}>{message}</Text>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <></>
        )}
        {loading ? (
          <ButtonLoading tulisan="Loading..." />
        ) : cekakun ? (
          <>
            <ButtonSimpan text="Ya Akun Saya" onPress={() => sendEmail()} />
            <TouchableOpacity
              style={styles.btnNotMe}
              onPress={() => bukanAkunSaya()}>
              <Text style={styles.notme}>Bukan Akun Saya</Text>
            </TouchableOpacity>
          </>
        ) : (
          <ButtonSimpan text="Cek Akun" onPress={() => cekAkun()} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFE',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  containerHeader: {
    marginHorizontal: 16,
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textResetPassword: {
    fontSize: 18,
    fontWeight: '600',
    color: '#474747',
    marginLeft: 8,
  },
  infoPencarian: {
    flexDirection: 'column',
  },
  textPencarian: {
    fontSize: 16,
    fontWeight: '400',
    color: '#474747',
  },
  containerForm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  btnNotMe: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
  },
  notme: {
    color: '#8F50DF',
    fontSize: 18,
  },
});
