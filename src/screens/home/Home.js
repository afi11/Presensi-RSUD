import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity>
        <Text>Go To Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
