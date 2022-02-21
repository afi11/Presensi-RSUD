import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import {
  ButtonSimpan,
  HeaderWithBack,
  InputDatePicker,
  InputLabel,
  InputPickerFile,
} from '../../components';
import DocumentPicker from 'react-native-document-picker';
import {changeFormIzin, fetchRuleIzin} from '../../redux';
import {getUserId} from '../../config';
import { POST_DATA } from '../../services';

function TambahCuti({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {nama, jabatan, nik, namaDivisi} = route.params;

  const [tipeIzin, setTipeIzin] = useState(1);
  const [dateAwal, setDateAwal] = useState(new Date());
  const [dateAkhir, setDateAkhir] = useState(new Date());
  const [openAwal, setOpenAwal] = useState(false);
  const [openAkhir, setOpenAkhir] = useState(false);
  const [fileResponse, setFileResponse] = useState(null);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      dispatch(changeFormIzin('tipefile', response[0].type));
      RNFetchBlob.fs
        .readFile(response[0].uri, 'base64')
        .then(data => {
          dispatch(changeFormIzin('fileIzin', data));
        })
        .catch(err => {});
      setFileResponse(response);
      console.log(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const openCloseDateAwal = () => {
    setOpenAwal(!openAwal);
  };

  const putTanggalToForm = (type, tanggal) => {
    var tgl =
      tanggal.getFullYear() +
      '-' +
      (tanggal.getMonth() + 1) +
      '-' +
      tanggal.getDate();
    dispatch(changeFormIzin(type, tgl));
    if (type == 'tanggalMulaiIzin') {
      setDateAwal(tanggal);
    } else {
      setDateAkhir(tanggal);
    }
  };

  const openCloseDateAkhir = () => {
    setOpenAkhir(!openAkhir);
  };

  const izin = useSelector(state => state.izin);
  const dispatch = useDispatch();

  const changeValueShift = e => {
    setTipeIzin(e);
    dispatch(changeFormIzin('idRuleIzin', e));
  };

  const onChangeValueInput = (value, type) => {
    console.log(value);
    dispatch(changeFormIzin(type, value));
  };

  const goBack = () => {
    navigation.goBack();
  };

  const sendIzin = () => {
    POST_DATA('/send-izin', izin.ruleIzin)
      .then(response => {
        console.log(response);
        goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(fetchRuleIzin());
  }, []);

  useEffect(() => {
    getUserId().then(res => {
      dispatch(changeFormIzin('pegawaiCode', res));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HeaderWithBack goBack={() => goBack()} />
        <View style={styles.containerForm}>
          <InputLabel label="Nama" type="text" value={nama} editable={false} />
          <InputLabel label="NIK" type="text" value={nik} editable={false} />
          <View style={styles.row}>
            <View style={{width: '50%', padding: 2}}>
              <InputLabel
                label="Jabatan"
                type="text"
                value={jabatan}
                editable={false}
              />
            </View>
            <View style={{width: '50%', padding: 2}}>
              <InputLabel
                label="Ruangan"
                type="text"
                value={namaDivisi}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Alasan Izin *</Text>
            <View style={styles.row50}>
              <Picker
                selectedValue={tipeIzin}
                mode="dialog"
                style={{
                  color: '#000',
                  width: '100%',
                }}
                onValueChange={e => changeValueShift(e)}>
                {izin.ruleIzins.map(row => (
                  <Picker.Item
                    color="#fff"
                    label={row.namaIzin}
                    value={row.id}
                  />
                ))}
              </Picker>
              <Icon
                name="caretdown"
                color={'#A173C6'}
                style={{marginLeft: -50}}
              />
            </View>
          </View>
          <InputLabel
            label="Keterangan"
            type="text"
            editable={true}
            multiLine={true}
            numberOfLine={2}
            onChange={e => onChangeValueInput(e, 'keteranganIzin')}
            inputType="keteranganIzin"
          />
          <View style={styles.row}>
            <View style={{width: '50%', padding: 2}}>
              <InputDatePicker
                label="Tanggal Mulai"
                onPress={openCloseDateAwal}
                value={dateAwal.toDateString()}
              />
            </View>
            <View style={{width: '50%', padding: 2}}>
              <InputDatePicker
                label="Tanggal Akhir"
                onPress={openCloseDateAkhir}
                value={dateAkhir.toDateString()}
              />
            </View>
          </View>
          <InputPickerFile
            label="Ambil Dokumen"
            onPress={() => handleDocumentSelection()}
            fileName={
              fileResponse != null ? fileResponse[0].name : 'Belum dipilih'
            }
          />
          <ButtonSimpan onPress={() => sendIzin()} text="Ajukan" />
        </View>
      </ScrollView>
      <DatePicker
        modal
        open={openAwal}
        date={dateAwal}
        mode="date"
        textColor={isDarkMode ? '#FFF' : '#000'}
        onConfirm={date => {
          putTanggalToForm('tanggalMulaiIzin', date);
          openCloseDateAwal();
        }}
        onCancel={() => {
          openCloseDateAwal();
        }}
      />
      <DatePicker
        modal
        open={openAkhir}
        date={dateAkhir}
        minimumDate={dateAwal}
        mode="date"
        textColor={isDarkMode ? '#FFF' : '#000'}
        onConfirm={date => {
          putTanggalToForm('tanggalAkhirIzin', date);
          openCloseDateAkhir();
        }}
        onCancel={() => {
          openCloseDateAkhir();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#FAFAFE',
  },
  containerForm: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: -4,
  },
  label: {
    color: '#3B3D42',
    fontSize: 18,
    marginBottom: 8,
  },
  column: {flexDirection: 'column', marginBottom: 16},
  row50: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#A8A2B7',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    color: '#494949',
  },
});

export default TambahCuti;
