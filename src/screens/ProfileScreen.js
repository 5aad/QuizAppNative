import React, {useState, useEffect} from 'react';
import {Button, Title, Avatar} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../api/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({navigation}) => {
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [session, setSession] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const getSession = async () => {
    try {
      const asyncSession = await AsyncStorage.getItem('session');
      const asyncName = await AsyncStorage.getItem('username');
      const asyncEmail = await AsyncStorage.getItem('email');
      if (asyncSession !== null) {
        // value previously stored
        setSession(asyncSession);
        setName(asyncName);
        setEmail(asyncEmail);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const handleLogout = async () => {
    try {
      auth().signOut();
      await AsyncStorage.setItem('session', 'null');
    } catch (e) {
      console.log(e);
    }
    navigation.navigate('Login');
  };

  const launchImageLibrarys = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setFileData(response.data);
        setFileUri(response.uri);
      }
    });
  };
  function renderFileUri() {
    if (fileUri) {
      return <Avatar.Image size={100} source={{uri: fileUri}} />;
    } else {
      return <Avatar.Image size={100} source={images.avatar} />;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={{width: 24, height: 24}} source={images.leftArrow} />
        </TouchableWithoutFeedback>
        <Title style={styles.headerText}>Profile</Title>
      </View>
      <View style={styles.subContainer}>
        <View style={{alignItems: 'center'}}>
          {renderFileUri()}
          <Button
            labelStyle={styles.btnTxt}
            mode="text"
            onPress={launchImageLibrarys}>
            Change Avatar
          </Button>
        </View>
        <ScrollView>
          <Title style={styles.lbl}>UserName</Title>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.txtInput}
              placeholder="Add Name"
              placeholderTextColor="black"
              value={name}
            />
          </View>
          <Title style={styles.lbl}>Gender</Title>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.txtInput}
              placeholder="Add Gender"
              placeholderTextColor="black"
            />
          </View>
          <Title style={styles.lbl}>Age</Title>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.txtInput}
              placeholder="Add Age"
              placeholderTextColor="black"
            />
          </View>
          <Title style={styles.lbl}>Invite Friends by Email</Title>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.txtInput}
              placeholder="Email"
              placeholderTextColor="black"
              value={email}
            />
          </View>
          <Button
            style={styles.btn}
            color="white"
            contentStyle={styles.btnImgInner}
            labelStyle={styles.btnTxt}
            mode="contained"
            onPress={handleLogout}>
            LogOut
          </Button>
        </ScrollView>
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
    paddingHorizontal: 20,
  },
  btnImgInner: {
    width: 345,
    height: 50,
  },
  btn: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  btnTxt: {
    fontSize: 18,
    color: '#31BAF9',
    fontWeight: 'bold',
  },
  txtInput: {
    height: 50,
    width: 345,
    borderColor: '#B0B0B0',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    marginVertical: 5,
    backgroundColor: '#e5e5e5',
  },
  lbl: {
    color: '#B0B0B0',
    paddingLeft: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;