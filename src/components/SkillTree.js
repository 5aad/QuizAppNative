import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Svg, {G, Path, Ellipse} from 'react-native-svg';
import {Text, TouchableRipple} from 'react-native-paper';
import QuestionScreen from '../screens/QuestionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
const SkillTree = ({props, id, bgcolor, per, nav, innerImg, disabled}) => {
  const [enable, setEnabled] = useState('');
  const isFocused = useIsFocused();
  const fetch = async () => {
    try {
      const enabled = await AsyncStorage.getItem('enableNext');
      if (enabled !== null) {
        console.log(enabled, 'Id saved');
        setEnabled(enabled);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, [id,isFocused]);

  const handleClick = (en) => {
    const idd = id - 1;
    console.log(parseInt(en) + 1, idd.toString());
    if (id <= parseInt(enable) + 1 || (enable === '' && id == 1)) {
      nav.navigate('Question', {id: id});
    } else {
      alert('not available');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableRipple onPress={() => handleClick(enable)} rippleColor="#fff">
          <View style={{flex: 1, position: 'relative'}}>
            <View style={styles.circleContainer}>
              <ProgressCircle
                percent={per}
                radius={53}
                borderWidth={10}
                color="#ffd900"
                shadowColor="#e5e5e5"
                bgColor="#fff"
              />
            </View>
            <View style={[styles.imgContainer, {backgroundColor: bgcolor}]}>
              <Image
                style={{height: 52, width: 52, margin: 10}}
                source={innerImg}
              />

              <View style={styles.crownContainer}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.crownImg}
                  viewBox="0 0 40 40"
                  {...props}>
                  <Path
                    d="M12.756 14.993l4.876-5.111a3.281 3.281 0 014.67-.079l5.292 5.186 2.843-2.261a2.481 2.481 0 013.939 2.591L30.67 28.971a2.8 2.8 0 01-2.702 2.067h-16.06a2.8 2.8 0 01-2.703-2.067l-3.65-13.453a2.638 2.638 0 014.117-2.81l3.083 2.285z"
                    fill="#E5E5E5"
                    stroke="#FFF"
                    strokeWidth={2}
                    fillRule="evenodd"
                  />
                </Svg>
              </View>
            </View>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imgContainer: {
    position: 'relative',
    height: 72,
    width: 72,
    borderRadius: 98,
    marginTop: 25,
    marginBottom: 25,
    flexDirection: 'row',
  },
  crownContainer: {
    position: 'absolute',
    bottom: -20,
    right: -24,
    height: 50,
    width: 50,
    color: '#00000000',
  },
  crownImg: {
    height: '100%',
    width: '100%',
    color: '#00000000',
  },
  circleContainer: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 0,
    top: 8,
    marginLeft: -18,
  },
});

export default SkillTree;
