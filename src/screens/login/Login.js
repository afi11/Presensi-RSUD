import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {useSelector, useDispatch} from 'react-redux';
import {ButtonLogin, InputLogin, PasswordLogin} from '../../components';
import {putFormAuth} from '../../redux';
import {POST_DATA} from '../../services';

export default function Login({navigation}) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onChangeInput = (value, type) => {
    dispatch(putFormAuth(type, value));
  };

  const authLogin = () => {
    console.log(auth.user);
    POST_DATA('/auth/login', auth.user)
      .then(res => {
        console.log(res);
        AsyncStorage.setItem('token', 'Bearer ' + res.access_token);
        AsyncStorage.setItem('userId', res.user.pegawai_code);
        RNRestart.Restart();
      })
      .catch(err => console.log(err));
  };

  const gotoScreen = screen => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image
          style={styles.imgLogo}
          source={require('../../assets/images/logo.png')}
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
          placeHolder="Masukkan Password"
        />
        <View style={styles.rowPassword}>
          <TouchableOpacity>
            <Text style={styles.textForgetPassword}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>
        <ButtonLogin onPress={() => authLogin()} />
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
