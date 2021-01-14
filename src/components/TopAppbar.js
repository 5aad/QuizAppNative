import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import images from '../api/images';
const styles = StyleSheet.create({
  tinyLogo: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center',
  },
  logout: {
    color: '#c4c4c4',
    fontSize: 15,
    fontWeight: '700',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
const TopAppbar = ({check, headerName, headerWidth, navBar}) => {


  return (
    <View style={[styles.headerContainer, {width: headerWidth}]}>
      <TouchableWithoutFeedback
        onPress={() => {
          navBar.goBack();
        }}>
        <Image style={styles.tinyLogo} source={images.leftArrow} />
      </TouchableWithoutFeedback>
      <Text style={styles.headerText}>{headerName}</Text>
      {check === 'true' ? (
        <TouchableWithoutFeedback>
          <Text style={styles.logout}>Logout</Text>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};

export default TopAppbar;
