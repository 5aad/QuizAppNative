import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import images from '../api/images';
const styles = StyleSheet.create({
  tinyLogo: {
    width: 28,
    height: 28,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logout: {
    color: '#c4c4c4',
    fontSize: 15,
    fontWeight: '700',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subContain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const TreeAppBar = ({check, headerName, headerWidth, dayss, nav}) => {
  return (
    <View style={[styles.headerContainer, {width: headerWidth}]}>
      <Text onPress={() => nav.navigate('Bottom')} style={styles.headerText}>
        {headerName}
      </Text>

      <View style={styles.subContain}>
        <Image style={styles.tinyLogo} source={images.crown} />
        <Text style={[styles.headerText, {color: 'gold'}]}>8</Text>
      </View>

      <View style={styles.subContain}>
        <Image style={styles.tinyLogo} source={images.fire} />
        <Text style={[styles.headerText, {color: 'orange'}]}>{dayss}</Text>
      </View>

      <View style={styles.subContain}>
        <Image style={styles.tinyLogo} source={images.heart} />
        <Text style={[styles.headerText, {color: 'red'}]}>5</Text>
      </View>
    </View>
  );
};

export default TreeAppBar;
