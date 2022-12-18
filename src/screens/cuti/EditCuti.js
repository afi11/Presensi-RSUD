import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {useSelector, useDispatch} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {
  ButtonLoading,
  ButtonSimpan,
  HeaderWithBack,
  InputDatePicker,
  InputLabel,
  InputPickerFile,
} from '../../components';
import DocumentPicker from 'react-native-document-picker';
import {Snackbar} from 'react-native-paper';
import {changeFormIzin, fetchRuleIzin2} from '../../redux';
import {getTimeNow, getUserId} from '../../config';
import {UPDATE_DATA} from '../../services';

function EditCuti({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    nama,
    jabatan,
    nik,
    namaDivisi,
    activityCode,
    idRuleIzin,
    keteranganIzin,
    tanggalMulaiIzin,
    tanggalAkhirIzin,
    tipeWaktu,
    fileIzinPrevious,
  } = route.params;

  const [tipeIzin, setTipeIzin] = useState(0);
  const [dateAwal, setDateAwal] = useState(new Date());
  const [dateAkhir, setDateAkhir] = useState(new Date());
  const [openAwal, setOpenAwal] = useState(false);
  const [openAkhir, setOpenAkhir] = useState(false);
  const [fileResponse, setFileResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIzin, setSelectedIzin] = useState(idRuleIzin);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleFailed, setVisibleFailed] = useState(false);

  const onShowSnackBarSuccess = () => setVisibleSuccess(true);
  const onShowSnackBarFailed = () => setVisibleFailed(true);

  const onDismissSnackBarSuccess = () => setVisibleSuccess(false);
  const onDismissSnackBarFailed = () => setVisibleFailed(false);

  const auth = useSelector(state => state.auth);

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
    var _FOUND = izin.ruleIzins.find(function (row, index) {
      if (row.id == e) return true;
    });
    dispatch(changeFormIzin('idRuleIzin', e));
    setSelectedIzin(e);
    dispatch(changeFormIzin('tipeWaktu', _FOUND.namaIzin));
  };

  const onChangeValueInput = (value, type) => {
    console.log(value);
    dispatch(changeFormIzin(type, value));
  };

  const goBack = () => {
    navigation.goBack();
  };

  const sendIzin = () => {
    dispatch(changeFormIzin('waktuPresensiUser', getTimeNow()));
    setLoading(true);
    UPDATE_DATA('update-presensi', izin.ruleIzin.activityCode2, izin.ruleIzin)
      .then(response => {
        setLoading(false);
        if (response.status) {
          setSuccess(response.message);
          onShowSnackBarSuccess();
          goBack();
        } else {
          setError(response.message);
          onShowSnackBarFailed();
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err);
        alert(err);
        console.log(err);
      });
  };

  useEffect(() => {
    setDateAwal(new Date(tanggalMulaiIzin));
    setDateAkhir(new Date(tanggalAkhirIzin));
  }, []);

  useEffect(() => {
    getUserId().then(res => {
      dispatch(fetchRuleIzin2(res));
    });
  }, []);

  useEffect(() => {
    getUserId().then(res => {
      dispatch(getProfilData(res));
    });
  }, []);

  useEffect(() => {
    getUserId().then(res => {
      dispatch(changeFormIzin('pegawaiCode', res));
    });
  }, []);

  useEffect(() => {
    dispatch(changeFormIzin('tanggalMulaiIzin', tanggalMulaiIzin));
    dispatch(changeFormIzin('tanggalAkhirIzin', tanggalAkhirIzin));
    dispatch(changeFormIzin('keteranganIzin', keteranganIzin));
    dispatch(changeFormIzin('idRuleIzin', idRuleIzin));
    dispatch(changeFormIzin('activityCode2', activityCode));
    dispatch(changeFormIzin('tipeWaktu', tipeWaktu));
    dispatch(changeFormIzin('fileIzinPrevious', fileIzinPrevious));
    dispatch(changeFormIzin('fileIzin', ''));
    dispatch(changeFormIzin('tipeFile', ''));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HeaderWithBack
          goBack={goBack}
          title="Edit Cuti"
          imgProfil={auth.profil.foto_pegawai}
        />
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
                selectedValue={selectedIzin}
                mode="dialog"
                style={{
                  color: '#000',
                  width: '100%',
                }}
                onValueChange={e => changeValueShift(e)}>
                {izin.ruleIzins.map(row => (
                  <Picker.Item
                    color={isDarkMode ? '#FFF' : '#000'}
                    label={row.namaIzin}
                    value={row.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <InputLabel
            label="Keterangan"
            type="text"
            editable={true}
            multiLine={true}
            numberOfLine={2}
            value={keteranganIzin}
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
          {loading ? (
            <ButtonLoading tulisan="Loading..." />
          ) : (
            <ButtonSimpan onPress={() => sendIzin()} text="Update" />
          )}
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
      <View style={{alignItems: 'center'}}>
        <Snackbar
          visible={visibleSuccess}
          onDismiss={onDismissSnackBarSuccess}
          style={{backgroundColor: '#0bc663'}}>
          <Text style={{color: '#fff', fontSize: 18}}>{success}</Text>
        </Snackbar>
        <Snackbar
          visible={visibleFailed}
          onDismiss={onDismissSnackBarFailed}
          style={{backgroundColor: '#cc1616'}}>
          <Text style={{color: '#fff', fontSize: 18}}>{error}</Text>
        </Snackbar>
      </View>
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

export default EditCuti;
