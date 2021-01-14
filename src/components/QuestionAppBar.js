import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {ProgressBar, Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../api/images';

const QuestionAppBar = ({per, green, red}) => {
  const navigation = useNavigation();
  const chart_wh = 24;
  const series = [red, green];
  const sliceColor = ['#F44336', '#4CAF50'];
  const setData = async (percc) => {
    try {
      await AsyncStorage.setItem('one_one', percc.toString());
    } catch (e) {
      console.log(e);
    }
  };
  const handleCross = (perc) => {
    setData(perc);
    navigation.goBack();
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableWithoutFeedback onPress={() => handleCross(per)}>
        <Image style={styles.tinyLogo} source={images.close} />
      </TouchableWithoutFeedback>
      <ProgressBar style={styles.bar} progress={per} color={'#F5B728'} />
      <PieChart chart_wh={chart_wh} series={series} sliceColor={sliceColor} />
    </View>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 30,
    alignItems: 'center',
  },
  bar: {
    width: 270,
    height: 12,
    borderRadius: 20,
    marginHorizontal: 15,
  },
});
export default QuestionAppBar;
