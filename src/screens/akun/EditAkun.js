import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import {ButtonSimpan, HeaderWithBack, InputLabel} from '../../components';

function EditAkun({navigation}) {
  const [showBottom, setShowBottom] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const camera = <Icon name="camera" size={24} color={'#A8A2B7'} />;
  return (
    <ScrollView
      style={styles.scrollBg}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.bgAkun}>
        <HeaderWithBack goBack={goBack} />
        <View style={styles.rowImagePicker}>
          <TouchableOpacity onPress={() => setShowBottom(true)}>
            <Image
              style={styles.imgUser}
              source={require('../../assets/images/jenny-sayang.jpg')}
            />
            <View style={styles.rowIconCamera}>
              <Icon name="camera" size={24} color={'#8F50DF'} />
            </View>
          </TouchableOpacity>
        </View>
        <InputLabel label="Nama" type="text" />
        <InputLabel label="Nomor Induk Kependudukan" type="text" />
        <InputLabel label="Kata Sandi" type="password" />
        <InputLabel label="Konfirmasi Kata Sandi" type="password" />
        <ButtonSimpan text="Simpan" onPress={null} />
      </View>
      <RNBottomActionSheet.SheetView
        visible={showBottom}
        title={'Upload File Foto'}
        theme={'light'}
        onSelection={(index, value) => {
          // value is optional
          console.log('selection: ' + index + ' ' + value);
        }}>
        <RNBottomActionSheet.SheetView.Item
          title={'Kamera'}
          subTitle={'Kamera Handphone'}
          icon={camera}
        />
        <RNBottomActionSheet.SheetView.Item
          title={'Galery'}
          subTitle={'Galery Handphone'}
          icon={<Icon name="camera" size={24} color={'#A8A2B7'} />}
        />
      </RNBottomActionSheet.SheetView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBg: {
    backgroundColor: '#FAFAFE',
  },
  bgAkun: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  rowImagePicker: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowIconCamera: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
    marginTop: -40,
    marginLeft: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imgUser: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default EditAkun;
