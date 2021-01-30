import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button, Title, Text, TextInput} from 'react-native-paper';
import images from '../api/images';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]=useState('')
 
  const [prevDate, setPrevDate] = useState("0");
  const [currentDate, setCurrentDate] = useState();
  const [increment, setIncrement] = useState("1");

  const isFocused = useIsFocused();

  let dd = new Date();
  // dd.toString();
  // dd = dd.getDate();

  const setSession = async () => {
    try {
      await AsyncStorage.setItem('session', 'sessionLogin');
    } catch (e) {
      console.log(e);
    }
  };
  const reset = async () => {
    try {
      await AsyncStorage.setItem("asyncPrev", "0");
      navigation.navigate("Bottom");
    } catch (error) {
      console.log(error);
    }
  };
  const asyncDate = async () => {
    try {
      await AsyncStorage.setItem("asyncPrev", prevDate);
      await AsyncStorage.setItem("asyncCurrent", dd.getDate().toString());
      await AsyncStorage.setItem("asyncIncrement", increment);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  async function fetchData() {
    try {
     
      const inc = await AsyncStorage.getItem("asyncIncrement");
      const cur = await AsyncStorage.getItem("asyncCurrent");
      const pre = await AsyncStorage.getItem("asyncPrev");
      if (inc !== null) {
        // value previously stored
        setCurrentDate(cur);
        setPrevDate(pre);
        setIncrement(inc);
        console.log("parsprev", pre, cur, inc);
        let dif = cur - pre;
        console.log(dif);
        if (dif === 1) {
          setIncrement((dif + 1).toString());
        } else {
          console.log("diff");
        }
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }
 
  const handleLogin = () => {
    if (email != null || password != null) {
        fetchData()
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((authUser) => {
          if (authUser.user.emailVerified) {
            setUser(authUser.user.displayName)
            setEmail(authUser.user.email)
           
            console.log(authUser.user.email,'asdf')
            setSession();
            console.log(email, "ssad");
            console.log("parspressv", prevDate, currentDate, increment);
            asyncDate();
            if (prevDate !== "0" && currentDate !== "0" && increment !== "0") {
              console.log("elseif", prevDate, currentDate, increment);
              navigation.navigate("Bottom");
            } else {
              reset();

              // navigation.navigate('Bottom');
            }
          } else {
            authUser.user?.sendEmailVerification();
            alert("Please verify your email address sent to your inbox!");
          }
        })
        .catch((error) => 
          {
            if(error.code==='auth/invalid-email'){
              alert('Your email is invalid')
            }else {
              alert(error.message)
            }
          }
        );
        
    } else {
      alert('Please Enter your Email and Password');
    }
  };
  useEffect(() => {
    // setDay(dd.getDate().toString());
    if (prevDate === "0") {
      console.log("if use ", dd.getDate().toString());
      setPrevDate(dd.getDate.toString());
    }

    fetchData();
  }, [isFocused]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{alignItems: 'center'}}>
              <Image style={styles.illus} source={images.login_i} />
            </View>
            <ScrollView>
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
            </ScrollView>
            <View>
              <View style={styles.regContainer}>
                <Text>don't have an account? </Text>
                <Button
                  mode="text"
                  onPress={() => navigation.navigate('Register')}>
                  Sign up
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

export default LoginScreen;
