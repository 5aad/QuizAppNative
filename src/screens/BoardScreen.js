import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import TopAppbar from '../components/TopAppbar';
import ItemList from '../components/ItemList';
import images from '../api/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BoardList from '../components/BoardList';
const Data = [
  {
    id: '1',
    title: 'AQA',
    status: 'coming soon!',
    screenName: 'Topic',
    img: images.aqa,
    type: 'board',
  },
  {
    id: '2',
    title: 'Edexcel',
    status: 'coming soon!',
    screenName: 'Topic',
    img: images.edex,
    type: 'soon',
  },
  {
    id: '3',
    title: 'OCR',
    status: 'coming soon!',
    screenName: 'Topic',
    img: images.ocr,
    type: 'soon',
  },
];
const BoardScreen = ({navigation}) => {
  const [headerNm, setHeaderNm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('course_title');
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
        <BoardList nav={navigation} Data={Data} />
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

export default BoardScreen;
