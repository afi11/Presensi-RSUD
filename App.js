import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Router, LoginPageStack} from './src/router';
import {getToken, getUserId} from './src/config';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

LogBox.ignoreAllLogs();

const App = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('');

  useEffect(() => {
    getToken().then(res => {
      setToken(res);
      getUserId().then(res2 => {
        setUserId(res2);
        axios.defaults.headers.common['Authorization'] = res;
        if (res != null && res2 != null) {
          setPage('Home');
        } else {
          setPage('Login');
        }
      });
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* {token != null && userId != null ? <Router /> : <LoginPageStack />} */}
        {page == 'Home' ? (
          <Router />
        ) : page == 'Login' ? (
          <LoginPageStack />
        ) : (
          <LoadingScreen />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
