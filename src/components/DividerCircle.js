import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Divider from "react-native-divider";
const DividerCircle = ({ props, bgcolor, bdColor, imgStar }) => {
  return (
    <View style={styles.subContainer}>
      <View
        style={{
          backgroundColor: bdColor,
          width: "35%",
          height: 2,
          position: "absolute",
        }}
      ></View>
      <View style={[styles.imgContainer, { backgroundColor: bgcolor }]}>
        <Image style={styles.tinyLogo} source={imgStar} />
      </View>

      <View
        style={{
          backgroundColor: bdColor,
          width: "35%",
          height: 2,
          marginLeft: "65%",
          position: "absolute",
        }}
      ></View>
      {/* <Divider borderColor={bdColor} orientation="center"></Divider> */}
    </View>
  );
};
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginVertical: 60,
    marginBottom: 0,
  },
  imgContainer: {
    position: "relative",
    height: 100,
    width: 100,
    borderRadius: 98,
    flexDirection: "row",
    marginLeft: "38%",
    marginTop: -50,
  },
  tinyLogo: {
    height: 72,
    width: 72,
    left: 15,
    top: 10,
  },
});
export default DividerCircle;
