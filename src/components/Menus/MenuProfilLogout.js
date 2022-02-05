import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function MenuProfilLogout(props) {
  const {iconName, linkName, logout} = props;

  return (
    <TouchableOpacity style={styles.rowMenu} onPress={() => logout()}>
      <View style={styles.rowMenuProfil}>
        <Icon name={iconName} size={24} color={'#B39FCD'} />
        <Text style={styles.textMenu}>{linkName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowMenu: {
    marginBottom: 16,
  },
  rowMenuProfil: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMenu: {
    color: '#B39FCD',
    fontSize: 22,
    marginLeft: 12,
  },
});

export default MenuProfilLogout;
