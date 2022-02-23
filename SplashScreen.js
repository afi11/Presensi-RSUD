import React, {useRef, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';

function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 8000,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View // Special animatable View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        <Image
          style={styles.imgLogo}
          source={require('./src/assets/images/logo.png')}
        />
        <Text style={styles.textApp}>PresensiApp</Text>
      </Animated.View>
      <Text style={styles.textCopyRight}>
        {'\u00A9'}2022 RSUD Gambiran Kota Kediri
      </Text>
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
  imgLogo: {
    width: 100,
    height: 100,
    marginBottom: 23,
  },
  textApp: {
    fontSize: 24,
    fontWeight: '600',
    color: '#303030',
    fontFamily: 'Helvetica',
  },
  textCopyRight: {
    position: 'absolute',
    bottom: 24,
  },
});

export default SplashScreen;
