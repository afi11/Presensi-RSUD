import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Akun,
  AllPresensi,
  EditAkun,
  Home,
  Login,
  Presensi,
  Cuti,
  TambahCuti,
  EditCuti,
  ResetPassword,
  FileIzinView,
} from '../screens';

const LoginStack = createNativeStackNavigator();
const BerandaStack = createNativeStackNavigator();
const PresensiStack = createNativeStackNavigator();
const CutiStack = createNativeStackNavigator();
const AkunStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const LoginPageStack = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="ResetPassword" component={ResetPassword} />
    </LoginStack.Navigator>
  );
};

const HomePageStack = () => {
  return (
    <BerandaStack.Navigator>
      <BerandaStack.Screen
        name="Beranda"
        options={{
          headerShown: false,
        }}
        component={Home}
      />
    </BerandaStack.Navigator>
  );
};

const PresensiPageStack = () => {
  return (
    <PresensiStack.Navigator>
      <PresensiStack.Screen
        options={{
          headerShown: false,
        }}
        name="Presensi"
        component={Presensi}
      />
      <PresensiStack.Screen
        options={{
          headerShown: false,
        }}
        name="AllPresensi"
        component={AllPresensi}
      />
    </PresensiStack.Navigator>
  );
};

const CutiPageStack = () => {
  return (
    <CutiStack.Navigator>
      <CutiStack.Screen
        options={{
          headerShown: false,
        }}
        name="Cuti"
        component={Cuti}
      />
      <CutiStack.Screen
        options={{
          headerShown: false,
        }}
        name="TambahCuti"
        component={TambahCuti}
      />
      <CutiStack.Screen
        options={{
          headerShown: false,
        }}
        name="EditCuti"
        component={EditCuti}
      />
      <CutiStack.Screen
        options={{
          headerShown: true,
          title: "File Izin"
        }}
        name="FileIzinView"
        component={FileIzinView}
      />
    </CutiStack.Navigator>
  );
};

const AkunPageStack = () => {
  return (
    <AkunStack.Navigator>
      <AkunStack.Screen
        name="Akun"
        options={{
          headerShown: false,
        }}
        component={Akun}
      />
      <AkunStack.Screen
        name="EditAkun"
        options={{
          headerShown: false,
        }}
        component={EditAkun}
      />
    </AkunStack.Navigator>
  );
};

function Router() {
  const activeTintLabelColor = '#8F50DF';
  const inactiveTintLabelColor = '#808080';
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#8F50DF',
          tabBarStyle: {height: 60},
        }}>
        <Tab.Screen
          name="HomePageStack"
          component={HomePageStack}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused
                    ? activeTintLabelColor
                    : inactiveTintLabelColor,
                }}>
                Home
              </Text>
            ),
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={28} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="PresensiPageStack"
          component={PresensiPageStack}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused
                    ? activeTintLabelColor
                    : inactiveTintLabelColor,
                }}>
                Presensi
              </Text>
            ),
            tabBarIcon: ({color, size}) => (
              <Icon name="touch-app" color={color} size={28} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="CutiPageStack"
          component={CutiPageStack}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused
                    ? activeTintLabelColor
                    : inactiveTintLabelColor,
                }}>
                Izin
              </Text>
            ),
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="file" color={color} size={28} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AkunPageStack"
          component={AkunPageStack}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused
                    ? activeTintLabelColor
                    : inactiveTintLabelColor,
                }}>
                Akun
              </Text>
            ),
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="account" color={color} size={28} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export {LoginPageStack, Router};
