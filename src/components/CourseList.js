import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Title, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CourseList = ({nav, Data}) => {
  const handleClick = async (screenName, title, type) => {
    if (type === 'course') {
      try {
        await AsyncStorage.setItem('course_title', title);
      } catch (e) {
        console.log(e);
      }
      nav.navigate(screenName);
    } else {
      alert('not available');
    }
  };

  const renderItem = ({item}) => (
    // onPress={() => handleClick(item.screenName, item.title, item.type)}
    <View style={styles.itemBorder}>
      <Card
        style={{borderRadius: 12}}
        onPress={() => handleClick(item.screenName, item.title, item.type)}>
        <Card.Cover style={{height: 80, borderRadius: 12}} source={item.img} />
        <View style={styles.innerItem}>
          <Title style={styles.txtHeading}>{item.title}</Title>
          <Text style={{color: 'white'}}>{item.status}</Text>
        </View>
      </Card>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemBorder: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginHorizontal: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  innerItem: {
    position: 'absolute',
    paddingLeft: 20,
    paddingTop: 10,
  },
  txtHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
});
export default CourseList;
