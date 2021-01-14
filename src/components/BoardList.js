import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Card, Title, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BoardList = ({nav, Data}) => {
  const handleClick = async (screenName, title, type) => {
    if (type === 'board') {
      try {
        await AsyncStorage.setItem('board_title', title);
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
        style={{borderRadius: 12, height: 100}}
        onPress={() => handleClick(item.screenName, item.title, item.type)}>
        <Image
          style={{
            height: 80,
            width: 200,
            resizeMode: 'contain',
            marginLeft: 30,
          }}
          source={item.img}
        />

        <View style={styles.innerItem}>
          <Text>{item.status}</Text>
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
    bottom: 10,
    left: 15,
    paddingLeft: 20,
    paddingTop: 10,
  },
  txtHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  
});
export default BoardList;
