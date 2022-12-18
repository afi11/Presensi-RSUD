import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, FlatList, Text, Alert} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  ButtonBatalIzin,
  CardRiwayatIzin,
  CardRiwayatIzinPending,
  CardRiwayatIzinTolak,
  HeaderNotBack,
} from '../../components';
import {ButtonAjukanIzin, ButtonDetIzin} from '../../components';
import {getUserId} from '../../config';
import moment from 'moment';
import {fetchIzinData, getProfilData} from '../../redux';
import {GET_DATA} from '../../services';

const Cuti = () => {
  const auth = useSelector(state => state.auth);
  const izin = useSelector(state => state.izin);
  const [detail, setDetail] = useState({});
  const refRBSheet = useRef();
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const gotoScreen = screen => {
    navigation.navigate(screen, {
      nama: auth.profil.nama,
      nik: auth.profil.nik,
      jabatan: auth.profil.jabatan,
      namaDivisi: auth.profil.namaDivisi,
    });
  };

  const gotoPage = (screen, data) => {
    navigation.navigate(screen, {
      nama: auth.profil.nama,
      nik: auth.profil.nik,
      jabatan: auth.profil.jabatan,
      namaDivisi: auth.profil.namaDivisi,
      activityCode: data.activityCode,
      idRuleIzin: data.idRuleIzin,
      keteranganIzin: data.keteranganIzin,
      tanggalMulaiIzin: data.tanggalMulaiIzin,
      tanggalAkhirIzin: data.tanggalAkhirIzin,
      dokumenPendukung: data.dokumenPendukung,
      tipeWaktu: data.tipeWaktu,
      fileIzinPrevious: data.dokumenPendukung,
    });
  };

  const openDetail = data => {
    console.log(data);
    refRBSheet.current.open();
    setDetail(data);
  };

  const openFile = file => {
    console.log(file);
    navigation.navigate('FileIzinView', {
      file: file,
    });
  };

  useEffect(() => {
    getUserId().then(res => {
      dispatch(getProfilData(res));
    });
  }, []);

  const batalkanIzin = kode => {
    Alert.alert('Konfirmasi', 'Izin / Cuti Ingin Dibatalkan ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          GET_DATA(`batal-izin/${kode}`).then(res => {
            getIzinData();
          });
        },
      },
    ]);
  };

  const getIzinData = () => {
    getUserId().then(res => {
      dispatch(fetchIzinData(res));
    });
  };

  useEffect(() => {
    getUserId().then(res => {
      dispatch(fetchIzinData(res));
    });
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <HeaderNotBack title="Izin" imgProfil={auth.profil.foto_pegawai} />
      <View style={styles.containerHeader}>
        <ButtonAjukanIzin
          onPress={() => gotoScreen('TambahCuti')}
          text="Ajukan Izin"
        />
      </View>
      <Text
        style={{
          color: '#3D3442',
          fontSize: 16,
          fontWeight: '500',
          marginVertical: 10,
        }}>
        Riwayat Cuti
      </Text>
      {izin.izins != null ? (
        <FlatList
          data={izin.izins}
          renderItem={({item}) =>
            item.statusIzin == 0 ? (
              <CardRiwayatIzinPending
                //onPress={() => gotoPage('EditCuti', item)}
                onPress={() => openDetail(item)}
                tanggalPengajuan={item.created_at}
                tanggalPresensi={item.tanggalMulaiIzin}
                tanggalSelesai={item.tanggalAkhirIzin}
                alasan={item.namaIzin}
                status={item.statusIzin}
              />
            ) : item.statusIzin == 1 ? (
              <CardRiwayatIzin
                onPress={() => openDetail(item)}
                tanggalPengajuan={item.created_at}
                tanggalPresensi={item.tanggalMulaiIzin}
                tanggalSelesai={item.tanggalAkhirIzin}
                alasan={item.namaIzin}
                status={item.statusIzin}
              />
            ) : item.statusIzin == 2 ? (
              <CardRiwayatIzinTolak
                tanggalPengajuan={item.created_at}
                tanggalPresensi={item.tanggalMulaiIzin}
                tanggalSelesai={item.tanggalAkhirIzin}
                alasan={item.namaIzin}
                status={item.statusIzin}
              />
            ) : (
              <CardRiwayatIzinTolak
                tanggalPengajuan={item.created_at}
                tanggalPresensi={item.tanggalMulaiIzin}
                tanggalSelesai={item.tanggalAkhirIzin}
                alasan={item.namaIzin}
                status={item.statusIzin}
              />
            )
          }
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={{fontSize: 16, textAlign: 'center', color: '#A173C6'}}>
          Tidak Ada Riwayat Cuti
        </Text>
      )}
      <RBSheet
        ref={refRBSheet}
        height={400}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.openDetail}>
          <Text style={styles.textDetailHeader}>Detail Izin</Text>
          <View style={styles.openDetailRow}>
            <Text style={styles.textDetail}>Tanggal Pengajuan</Text>
            <Text style={styles.textDetail2}>
              {' '}
              {moment(detail.tanggalMulaiIzin).format('DD MMMM YYYY')}
            </Text>
          </View>
          <View style={styles.openDetailRow}>
            <Text style={styles.textDetail}>Tanggal Mulai</Text>
            <Text style={styles.textDetail2}>
              {moment(detail.tanggalMulaiIzin).format('DD MMMM YYYY')}
            </Text>
          </View>
          <View style={styles.openDetailRow}>
            <Text style={styles.textDetail}>Tanggal Selesai</Text>
            <Text style={styles.textDetail2}>
              {moment(detail.created_at).format('DD MMMM YYYY')}
            </Text>
          </View>
          <View style={styles.openDetailRow}>
            <Text style={styles.textDetail}>Alasan Izin</Text>
            <Text style={styles.textDetail2}>{detail.namaIzin}</Text>
          </View>
          <View style={styles.openDetailRow}>
            <Text style={styles.textDetail}>Keterangan</Text>
            <Text style={styles.textDetail2}>{detail.keteranganIzin}</Text>
          </View>
          <View style={styles.openDetailRow}>
            <Text style={styles.textDetail}>Dokumen Pendukung</Text>
            <Text
              onPress={() => openFile(detail.dokumenPendukung)}
              style={styles.textDetailLink}>
              Lihat / Download
            </Text>
          </View>
          <View style={styles.openDetailRow}>
            <Text style={styles.textDetail}>Status Pengajuan</Text>
            <Text style={styles.textDetail2}>
              {detail.statusIzin == 0
                ? 'Menunggu Persetujuan'
                : detail.statusIzin == 1
                ? 'Diterima'
                : detail.statusIzin == 2
                ? 'Ditolak'
                : 'Dibatalkan'}
            </Text>
          </View>
          <View style={styles.openDetailRow}>
            <ButtonBatalIzin
              onPress={() => batalkanIzin(detail.activityCode)}
              text="Batal Pengajuan"
              enable={true}
            />
            <ButtonDetIzin
              onPress={() => gotoPage('EditCuti', detail)}
              text="Ubah Pengajuan"
              enable={detail.statusIzin == 0 ? true : false}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#FAFAFE',
  },
  indicatorStyle: {
    backgroundColor: '#A173C6',
    padding: 1.5,
  },
  header: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  containerHeader: {
    backgroundColor: '#F1E1FD',
    borderRadius: 15,
    padding: 10,
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  openDetail: {
    width: '100%',
    flexDirection: 'column',
    padding: 16,
  },
  openDetailRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textDetailHeader: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  textDetail: {
    color: '#000',
    fontSize: 18,
  },
  textDetail2: {
    color: '#565656',
    fontSize: 18,
  },
  textDetailLink: {
    color: '#A173C6',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default Cuti;
