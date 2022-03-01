import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {urlAssetIzin} from '../../config/Url';

function FileIzinView({route, navigation}) {

  const {file} = route.params;
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: urlAssetIzin + file,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
});

export default FileIzinView;
