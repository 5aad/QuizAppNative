import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import TopAppbar from '../components/TopAppbar';
import ItemList from '../components/ItemList';
import images from '../api/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopicList from '../components/TopicList';
const Data = [
  {
    id: '1',
    title: 'Cells Biology',
    screenName: 'Tree',
    img: images.cell,
    type: 'topic',
  },
  {
    id: '2',
    title: 'Oraganization',
    screenName: 'Tree',
    img: images.org,
    type: 'topic',
  },
  {
    id: '3',
    title: 'Infection & Response',
    screenName: 'Tree',
    img: images.infec,
    type: 'topic',
  },
  {
    id: '4',
    title: 'Bioenergetics',
    screenName: 'Tree',
    img: images.bio,
    type: 'topic',
  },
];
const TopicScreen = ({navigation}) => {
  const [headerNm, setHeaderNm] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('board_title');
        if (value !== null) {
          // value previously stored
          // console.log(value);
          setHeaderNm(value);
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TopAppbar headerName={headerNm} headerWidth={240} navBar={navigation} />
      <View style={styles.subContainer}>
        <TopicList nav={navigation} Data={Data} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  subContainer: {
    flex: 1,
  },
});

export default TopicScreen;
