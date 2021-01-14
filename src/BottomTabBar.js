import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import TreeScreen from './screens/TreeScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingScreen from './screens/SettingScreen';

const Tabs = AnimatedTabBarNavigator();
const styles = StyleSheet.create({
  b: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
});
const TabBarIcon = (props) => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 32}
      color={props.tintColor}
    />
  );
};

export default () => (
  <Tabs.Navigator
    initialRouteName="Home"
    backBehavior="history"
    tabBarOptions={{
      activeTintColor: '#2a7ff6',
      inactiveTintColor: '#222324',
      activeBackgroundColor: '#fff',
      tabStyle: styles.b,
    }}>
    <Tabs.Screen
      name="Tree"
      component={TreeScreen}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <TabBarIcon
            size={32}
            focused={focused}
            tintColor={color}
            name="cloud"
          />
        ),
      }}
    />

    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <TabBarIcon
            size={32}
            focused={focused}
            tintColor={color}
            name="home"
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <TabBarIcon
            size={32}
            focused={focused}
            tintColor={color}
            name="user"
          />
        ),
      }}
    />

    <Tabs.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <TabBarIcon
            size={32}
            focused={focused}
            tintColor={color}
            name="setting"
          />
        ),
      }}
    />
  </Tabs.Navigator>
);
