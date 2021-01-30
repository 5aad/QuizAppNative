import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Title, Text, TextInput} from 'react-native-paper';
import images from '../api/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const RegisterScreen = ({navigation}) => {
  const firestoree=firestore()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (userName != null || email != null || password != null) {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        authUser.user.updateProfile({
          displayName: userName,
        });
        authUser.user?.sendEmailVerification();
        alert('We have sent an email to your inbox please verify your email!')
        navigation.navigate('Login');
        firestoree
          .collection('users')
          .doc()
          .set({
            email:email,
            userName:userName
          })
          .then(() => {
            console.log('User added!');
          })
          .catch((error)=>{
            console.log(error.code)
          })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
       
          alert('That email address is already in use!')
        }
        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!')
        }
        if(error.code=== 'auth/weak-password'){
          alert('The password is too weak');
        }
        console.error(error);
      });
    
    } else {
      alert('Please Enter your Email and Password');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{alignItems: 'center'}}>
              <Image style={styles.illus} source={images.reg_i} />
            </View>
            <ScrollView style={{backgroundColor: '#fff'}}>
              <Title style={styles.txtHeading}>Sign Up!</Title>

              <TextInput
                style={{marginBottom: 15}}
                label="User Name"
                value={userName}
                onChangeText={(e) => setUserName(e)}
              />
              <TextInput
                label="Email"
                value={email}
                onChangeText={(e) => setEmail(e)}
              />
              <TextInput
                style={{marginBottom: 20, marginTop: 15}}
                label="Password"
                value={password}
                onChangeText={(e) => setPassword(e)}
              />

              <View style={{alignItems: 'center'}}>
                <Button
                  mode="contained"
                  onPress={handleRegister}
                  style={{width: 250, borderRadius: 15}}
                  labelStyle={styles.btnText}
                  contentStyle={styles.btnInner}>
                  Sign Up
                </Button>
              </View>
            </ScrollView>
            <View>
              <View style={styles.regContainer}>
                <Text>already have an account? </Text>
                <Button
                  mode="text"
                  onPress={() => navigation.navigate('Login')}>
                  Login
                </Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illus: {
    height: 230,
    width: 200,
  },
  txtHeading: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
  },
  regContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnInner: {
    height: 50,
  },
});

export default RegisterScreen;