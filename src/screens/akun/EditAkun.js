import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {ButtonSimpan, HeaderWithBack, InputLabel} from '../../components';
import {getUserId, urlAssetImageProfil} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {putFormProfilUpdate} from '../../redux';
import {UPDATE_DATA} from '../../services';

function EditAkun({route, navigation}) {
  const [showBottom, setShowBottom] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [fileResponse, setFileResponse] = useState(null);

  const {nama, email, nik, foto} = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      dispatch(putFormProfilUpdate('tipefile', response[0].type));
      RNFetchBlob.fs
        .readFile(response[0].uri, 'base64')
        .then(data => {
          dispatch(putFormProfilUpdate('fotoUser', data));
        })
        .catch(err => {});
      setFileResponse(response);
      console.log(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const onChangeValueInput = (value, type) => {
    dispatch(putFormProfilUpdate(type, value));
  };

  const updateProfil = () => {
    if (auth.userUpdate.password == auth.userUpdate.konfirmasiPassword) {
      UPDATE_DATA('update_profil', auth.userUpdate.code, auth.userUpdate)
        .then(() => {
          goBack();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert('Konfirmasi Password tidak sama');
    }
  };

  useEffect(() => {
    getUserId().then(res => {
      dispatch(putFormProfilUpdate('code', res));
    });
  }, []);

  useEffect(() => {
    dispatch(putFormProfilUpdate('nama', nama));
    dispatch(putFormProfilUpdate('email', email));
    dispatch(putFormProfilUpdate('nik', nik));
  }, []);

  const camera = <Icon name="camera" size={24} color={'#A8A2B7'} />;
  return (
    <ScrollView
      style={styles.scrollBg}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.bgAkun}>
        <HeaderWithBack title={'Edit Profil'} goBack={goBack} />
        <View style={styles.rowImagePicker}>
          <TouchableOpacity onPress={() => handleDocumentSelection()}>
            <Image
              style={styles.imgUser}
              source={{
                uri:
                  fileResponse != null
                    ? fileResponse[0].uri
                    : urlAssetImageProfil + foto,
              }}
            />
            <View style={styles.rowIconCamera}>
              <Icon name="camera" size={24} color={'#8F50DF'} />
            </View>
          </TouchableOpacity>
        </View>
        <InputLabel
          label="Nama"
          type="text"
          onChange={e => onChangeValueInput(e, 'nama')}
          value={auth.userUpdate.nama}
        />
        <InputLabel
          label="Nomor Induk Kependudukan"
          type="text"
          onChange={e => onChangeValueInput(e, 'nik')}
          value={auth.userUpdate.nik}
        />
        <InputLabel
          label="Email"
          type="text"
          onChange={e => onChangeValueInput(e, 'email')}
          value={auth.userUpdate.email}
        />
        <InputLabel
          label="Kata Sandi kosongkan bila tidak diganti"
          type="password"
          onChange={e => onChangeValueInput(e, 'password')}
        />
        <InputLabel
          label="Konfirmasi Kata Sandi kosongkan bila tidak diganti"
          type="password"
          onChange={e => onChangeValueInput(e, 'konfirmasiPassword')}
        />
        <ButtonSimpan text="Simpan" onPress={() => updateProfil()} />
      </View>
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
