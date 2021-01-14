import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Divider from 'react-native-divider';
const DividerCircle = ({props, bgcolor, bdColor, imgStar}) => {
  return (
    <View style={styles.subContainer}>
      <Divider borderColor={bdColor} orientation="center">
        <View style={[styles.imgContainer, {backgroundColor: bgcolor}]}>
          <Image style={styles.tinyLogo} source={imgStar} />
        </View>
      </Divider>
    </View>
  );
};
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginVertical:40,
  },
  imgContainer: {
    position: 'relative',
    height: 100,
    width: 100,
    borderRadius: 98,
    marginTop: 25,
    marginBottom: 25,
    flexDirection: 'row',
  },
  tinyLogo: {
    height: 72,
    width: 72,
    left:15,
    top:10
  },
});
export default DividerCircle;
