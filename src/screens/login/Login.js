import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ButtonLogin, InputLogin, PasswordLogin} from '../../components';

export default function Login({navigation}) {
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
        <InputLogin onChange={null} placeHolder="Masukkan Username" />
        <PasswordLogin onChange={null} placeHolder="Masukkan Password" />
        <View style={styles.rowPassword}>
          <TouchableOpacity>
            <Text style={styles.textForgetPassword}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>
        <ButtonLogin onPress={() => gotoScreen('Home')} />
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
