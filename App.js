import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Router, LoginPageStack} from './src/router';
import {getToken, getUserId} from './src/config';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getUserId().then(res => {
      setUserId(res);
    });
  }, []);

  useEffect(() => {
    getToken().then(res => {
      setToken(res);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {token != null && userId != null ? <Router /> : <LoginPageStack />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
