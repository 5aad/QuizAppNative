import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import images from '../api/images';
import {Button, Title} from 'react-native-paper';
import CourseList from '../components/CourseList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
const Data = [
  {
    id: '1',
    title: 'Biology',
    status: '',
    screenName: 'Board',
    img: images.biology,
    type: 'course',
  },
  {
    id: '2',
    title: 'Chemistry',
    status: 'coming soon',
    screenName: 'Board',
    img: images.chemistry,
    type: 'soon',
  },
  {
    id: '3',
    title: 'Physics',
    status: 'coming soon',
    screenName: 'Board',
    img: images.physics,
    type: 'soon',
  },
];
const HomeScreen = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title style={styles.headerText}>Courses</Title>
      </View>
      <View style={styles.subContainer}>
        <CourseList nav={navigation} Data={Data} />
      </View>
      {/* <Button onPress={handless}>check</Button> */}
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
export default HomeScreen;
