import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {List} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemList = ({nav, Data}) => {
  const handleClick = async (screenName, title, type) => {
    if (type === 'course') {
      
      try {
        await AsyncStorage.setItem('course_title', title);
      } catch (e) {
        console.log(e);
      }
      nav.navigate(screenName);
    } else if (type === 'board') {
      try {
        await AsyncStorage.setItem('board_title', title);
      } catch (e) {
        console.log(e);
      }
      nav.navigate(screenName);
    } else if (type === 'topic') {
      try {
        await AsyncStorage.setItem('topic_title', title);
      } catch (e) {
        console.log(e);
      }
      nav.navigate(screenName);
    } else {
      console.log('error saad arha hai ');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemBorder}>
      <List.Item
        titleStyle={styles.innerItem}
        title={item.title}
        left={(props) => (
          <Image {...props} style={styles.ico} source={item.img} />
        )}
        onPress={() => handleClick(item.screenName, item.title, item.type)}
      />
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
    borderRadius: 10,
    marginVertical: 10,
  },
  innerItem: {
    fontSize: 20,
    fontWeight: '700',
  },
  ico: {
    height: 36,
    width: 32,
  },
});
export default ItemList;
