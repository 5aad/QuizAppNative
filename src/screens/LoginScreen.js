import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {Button, Title, Text, TextInput} from 'react-native-paper';
import images from '../api/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aEmail, setAsyncEmail] = useState('');
  const [aPassword, setAsyncPassword] = useState('');
  const [days,setDays]=useState('');
  const [date,setDate]=useState('');

  const setSession = async () => {
    try {
      await AsyncStorage.setItem('session', 'sessionLogin');
    } catch (e) {
      console.log(e);
    }
  };
  const increment= async (loginDay) =>{
    try{
      await AsyncStorage.setItem('days', loginDay+1);
    }catch(e){
      console.log(e)
    }
  }
  const reset= async () =>{
    try{
      await AsyncStorage.setItem('days',0);
      await AsyncStorage.setItem('date',null)
    }catch(e){
      console.log(e)
    }
  }
  
  const StoreDate= async (date) =>{
    try{
      await AsyncStorage.setItem('date',date);
      await AsyncStorage.setItem('days',1)
    }catch(e){
      console.log(e)
    }
  }
  async function fetchData() {
    try {
      const asyncEmail = await AsyncStorage.getItem('email');
      const asyncPass = await AsyncStorage.getItem('pass');
      const loginDate= await AsyncStorage.getItem('date');
      const loginDay=await AsyncStorage.getItem('days');
      if (asyncEmail !== null || asyncPass != null) {
        // value previously stored
        setAsyncEmail(asyncEmail);
        setAsyncPassword(asyncPass);
        setDate(loginDate)
        setDays(loginDay)
        setSession();
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }
  const handleLogin = () => {
    fetchData();
    if (email != null || password != null) {
      if (email === aEmail && password === aPassword) {
        console.log(email, 'ssad');
        var dd = new Date(Date.now());
        dd.toString();
        if(loginDate!==null){
          // dd = dd.getDate() + "/" + dd.getMonth() + 1 + "/" + dd.getFullYear();
          var loD= loginDate.split("/");
          if(dd.getFullYear()===loD[2]){
              if(dd.getMonth()===loD[1]){
                if((dd.getDay()-1)===loginDate[0]){
                    increment(loginDay);
                }else{
                  reset();
                }
              }
          }
        }else{
          dd = dd.getDate() + "/" + dd.getMonth() + 1 + "/" + dd.getFullYear()
          StoreDate(dd)
        }
        navigation.navigate('Bottom');
      } else {
        alert('Incorrect Email or Password');
      }
    } else {
      alert('Please Enter your Email and Password');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.illus} source={images.login_i} />
        </View>
        <Title style={styles.txtHeading}>Welcomeback!</Title>
        <Text style={styles.txtSmall}>
          Login in your existant account of cloud paas
        </Text>
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
            onPress={handleLogin}
            style={{width: 250, borderRadius: 15}}
            labelStyle={styles.btnText}
            contentStyle={styles.btnInner}>
            Login
          </Button>
        </View>

        <View style={styles.regContainer}>
          <Text>don't have an account? </Text>
          <Button mode="text" onPress={() => navigation.navigate('Register')}>
            Sign up
          </Button>
        </View>
      </View>
    </SafeAreaView>
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
    height: 250,
    width: 200,
  },
  txtHeading: {
    fontSize: 26,
    fontWeight: '900',
  },
  txtSmall: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 15,
    color: '#757575',
    marginBottom: 20,
  },
  regContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    right: 0,
    bottom: -50,
    left: 0,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnInner: {
    height: 50,
  },
});

export default LoginScreen;
