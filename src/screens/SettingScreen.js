import React from 'react';
import {Button, Title} from 'react-native-paper';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import TopAppbar from '../components/TopAppbar';
const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title style={styles.headerText}>Setting</Title>
      </View>
      <View style={styles.subContainer}>
        <Button
          style={styles.btn}
          color="white"
          contentStyle={styles.btnImgInner}
          labelStyle={styles.btnTxt}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Terms of Use
        </Button>

        <Button
          style={styles.btn}
          color="white"
          contentStyle={styles.btnImgInner}
          labelStyle={styles.btnTxt}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Privacy Policy
        </Button>

        <Button
          style={styles.btn}
          color="white"
          contentStyle={styles.btnImgInner}
          labelStyle={styles.btnTxt}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Rate Us
        </Button>

        <Button
          style={styles.btn}
          color="white"
          contentStyle={styles.btnImgInner}
          labelStyle={styles.btnTxt}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Support
        </Button>

        <Button
          style={styles.btn}
          color="white"
          contentStyle={styles.btnImgInner}
          labelStyle={styles.btnTxt}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          FAQs
        </Button>
        <Button
          style={styles.btn}
          color="white"
          contentStyle={styles.btnImgInner}
          labelStyle={styles.btnTxt}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Delete Account
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  btnImgInner: {
    width: 345,
    height: 50,
  },

  btn: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  btnTxt: {
    fontSize: 18,
    color: '#31BAF9',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingVertical:10
  },
});

export default SettingScreen;
