import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import DividerCircle from '../components/DividerCircle';
import SkillTree from '../components/SkillTree';
import TreeAppBar from '../components/TreeAppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../api/images';
const TreeScreen = ({props, navigation}) => {
  const [headerNm, setHeaderNm] = useState('');
  const [totalProgress1, setTotalProgress1] = useState(0);
  const [totalProgress2, setTotalProgress2] = useState(0);
  const [totalProgress3, setTotalProgress3] = useState(0);
  const [totalProgress4, setTotalProgress4] = useState(0);
  const isFocused = useIsFocused();
  const [days, setDays] = useState('');
  const [enable, setEnable] = useState(false);
  const [cc, setCC] = useState([1, 2, 3]);
  async function fetchData() {
    try {
      const value = await AsyncStorage.getItem('topic_title');

      const progres1 = await AsyncStorage.getItem(`one_one1`);
      const progres2 = await AsyncStorage.getItem(`one_one2`);
      const progres3 = await AsyncStorage.getItem(`one_one3`);
      const progres4 = await AsyncStorage.getItem(`one_one4`);

      const loginDay = await AsyncStorage.getItem('asyncIncrement');
      if (value !== null || progres1 != null || loginDay !== null) {
        // value previously stored
        console.log('days', loginDay);
        setHeaderNm(value);
        setTotalProgress1(parseFloat(progres1) * 100);
        setTotalProgress2(parseFloat(progres2) * 100);
        setTotalProgress3(parseFloat(progres3) * 100);
        setTotalProgress4(parseFloat(progres4) * 100);
        // if(parseFloat(progres) * 100,'progre'==100){
        //     setEnable(false)
        // }
        setDays(loginDay);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <TreeAppBar headerName={headerNm} dayss={days} nav={navigation} />
      <ScrollView style={styles.subContainer}>
        <SkillTree
          id="1"
          bgcolor="#31BAF9"
          nav={navigation}
          per={totalProgress1}
          innerImg={images.bacteria}
          disabled={false}
        />

        <View style={styles.skillContainer}>
          <SkillTree
            id="2"
            bgcolor="#31BAF9"
            nav={navigation}
            per={totalProgress2}
            innerImg={images.bacteria}
            disabled={true}
          />
          <SkillTree
            id="3"
            bgcolor="#31BAF9"
            nav={navigation}
            per={totalProgress3}
            innerImg={images.bacteria}
            disabled={true}
          />
        </View>
        <SkillTree
          id="4"
          bgcolor="#31BAF9"
          nav={navigation}
          per={totalProgress4}
          innerImg={images.bacteria}
          disabled={true}
        />

        {/* 2nd */}
        <DividerCircle
          bgcolor="#31BAF9"
          bdColor="#31BAF9"
          imgStar={images.star}
        />
        <View style={styles.skillContainer}>
          <SkillTree
            bgcolor="#ce82ff"
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
          <SkillTree
            bgcolor="#ce82ff"
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
        </View>
        <SkillTree
          bgcolor="#ce82ff"
          per={0}
          innerImg={images.bacteria}
          disabled={true}
        />
        <View style={styles.skillContainer}>
          <SkillTree
            bgcolor="#ce82ff"
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
          <SkillTree
            bgcolor="#ce82ff"
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
        </View>
        <SkillTree
          bgcolor="#ce82ff"
          per={0}
          innerImg={images.bacteria}
          disabled={true}
        />

        {/* 3rd */}
        <DividerCircle
          bgcolor="#ce82ff"
          bdColor="#ce82ff"
          imgStar={images.star2}
        />
        <SkillTree
          bgcolor="#F5B728"
          per={0}
          innerImg={images.bacteria}
          disabled={true}
        />
        <View style={styles.skillContainer}>
          <SkillTree
            bgcolor="#F5B728"
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
          <SkillTree
            bgcolor="#F5B728"
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
        </View>
        <SkillTree
          bgcolor="#F5B728"
          per={0}
          innerImg={images.bacteria}
          disabled={true}
        />
        <DividerCircle
          bgcolor="#F5B728"
          bdColor="#F5B728"
          imgStar={images.star3}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
  },
  skillContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TreeScreen;
