import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import images from '../api/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  const fetchData = async (data) => {
    try {
      const asyncUser = await AsyncStorage.getItem('session');
      if (asyncUser !== null) {
        // value previously stored
        console.log('sssd', asyncUser)
        if (data !== null && asyncUser === 'sessionLogin') {
          console.log('user', asyncUser);
          navigation.navigate('Bottom');
        } else if (data !== null && asyncUser === 'null') {
          navigation.navigate('Login');
        } else {
          alert('Something Wrong');
        }
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  async function fetchMyAPI() {
    const data = await this.performTimeConsumingTask();
    fetchData(data)
    
  }
  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.tinyLogo} source={images.logo} />
      <Text style={styles.txt}>CloudPass</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#446cb2',
  },
  tinyLogo: {
    width: 300,
    height: 220,
  },
  txt: {
    color: 'white',
    fontSize: 32,
  },
});
export default SplashScreen;
