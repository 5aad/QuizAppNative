import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Card, Title, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopicList = ({nav, Data}) => {
  const handleClick = async (screenName, title, type) => {
    if (type === 'topic') {
      try {
        await AsyncStorage.setItem('topic_title', title);
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
        style={{borderRadius: 12, height: 80}}
        onPress={() => handleClick(item.screenName, item.title, item.type)}>
        <View style={styles.subContainer}>
          <View style={styles.rightContainer}>
            <Title>{item.title}</Title>
            <Text>Biology</Text>
          </View>
          <Image style={styles.imgLeft} source={item.img} />
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
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightContainer: {
    marginLeft: 20,
  },
  imgLeft: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
});
export default TopicList;
