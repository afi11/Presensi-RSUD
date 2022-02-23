import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  useColorScheme,
} from 'react-native';

function LoadingScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ActivityIndicator size="large" color="#A884D8" />
      <Text style={styles.textCopyRight}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  textCopyRight: {
    color: '#232323',
    fontSize: 24,
  },
});

export default LoadingScreen;
