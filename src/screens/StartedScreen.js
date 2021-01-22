import React, {useState, useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Paragraph} from 'react-native-paper';
import images from '../api/images';

const StartedScreen = ({navigation}) => {
  const [ds, setDs] = useState('');
  useEffect(() => {
    let dd = new Date();
  setDs(dd.getDate().toString());
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Image style={styles.imgs} source={images.login_i} />
        <Paragraph style={{textAlign: 'center', marginBottom: 15}}>
          {' '}
          From last couple of days, Me and my friends were doing comparative
          study of ionic3 and react-native. During that {ds}
        </Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={{width: 250, borderRadius: 15}}
          labelStyle={styles.btnText}
          contentStyle={styles.btnInner}>
          Get Started
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnInner: {
    height: 50,
  },
  imgs: {
    width: 300,
    height: 300,
  },
});

export default StartedScreen;
