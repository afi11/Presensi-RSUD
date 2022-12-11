import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  useColorScheme,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {useSelector, useDispatch} from 'react-redux';
import {
  ButtonLoading,
  ButtonLogin,
  InputLogin,
  PasswordLogin,
} from '../../components';
import {putFormAuth} from '../../redux';
import {POST_DATA} from '../../services';

export default function Login({navigation}) {
  const auth = useSelector(state => state.auth);
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onChangeInput = (value, type) => {
    dispatch(putFormAuth(type, value));
  };

  const authLogin = () => {
    setLoading(true);
    POST_DATA('/auth/login', auth.user)
      .then(res => {
        setLoading(false);
        AsyncStorage.setItem(
          'user',
          JSON.stringify({
            token: 'Bearer ' + res.access_token,
            userId: res.user.pegawai_code,
          }),
        );
        RNRestart.Restart();
      })
      .catch(err => {
        setLoading(false);
        alert(err);
      });
  };

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('user');
  //     if (value !== null) {
  //       console.log(JSON.parse(value).userId);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  // useEffect(() => {
  //   _retrieveData();
  // }, []);

  const gotoScreen = screen => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.loginContainer}>
        <Image
          style={styles.imgLogo}
          source={require('../../assets/images/rg-berbenah.png')}
        />
        <Text style={styles.textHeader}>Selamat Datang</Text>
        <Text style={styles.textHeader2}>
          Masuk dengan username dan password
        </Text>
        <InputLogin
          onChange={e => onChangeInput(e, 'username')}
          inputType="username"
          placeHolder="Masukkan Username"
        />
        <PasswordLogin
          onChange={e => onChangeInput(e, 'password')}
          inputType="password"
          type="password"
          hidden={hidden}
          buttonHidden={() => setHidden(!hidden)}
          placeHolder="Masukkan Password"
        />
        {/* <View style={styles.rowPassword}>
          <TouchableOpacity onPress={() => gotoScreen('ResetPassword')}>
            <Text style={styles.textForgetPassword}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View> */}
        {loading ? (
          <ButtonLoading tulisan="Loading..." />
        ) : (
          <ButtonLogin onPress={() => authLogin()} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFE',
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 26,
  },
  imgLogo: {
    width: 100,
    height: 100,
    marginBottom: 23,
  },
  textHeader: {
    fontSize: 26,
    color: '#17181B',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textHeader2: {
    fontSize: 14,
    color: '#707480',
    fontWeight: 'normal',
    marginBottom: 36,
  },
  rowPassword: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textForgetPassword: {
    color: '#A884D8',
    fontWeight: '800',
    fontSize: 14,
  },
});
