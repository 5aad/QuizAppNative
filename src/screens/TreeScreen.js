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
  const [totalProgress, setTotalProgress] = useState(0);
  const isFocused = useIsFocused();

  async function fetchData() {
    try {
      const value = await AsyncStorage.getItem('topic_title');
      const progres = await AsyncStorage.getItem('one_one');
      if (value !== null || progres != null) {
        // value previously stored
        console.log(progres);
        setHeaderNm(value);
        setTotalProgress(parseFloat(progres) * 100);
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
      <TreeAppBar headerName={headerNm} />
      <ScrollView style={styles.subContainer}>
        <SkillTree
          bgcolor="#31BAF9"
          nav={navigation}
          per={totalProgress}
          innerImg={images.bacteria}
          disabled={false}
        />

        <View style={styles.skillContainer}>
          <SkillTree
            bgcolor="#31BAF9"
            nav={navigation}
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
          <SkillTree
            bgcolor="#31BAF9"
            nav={navigation}
            per={0}
            innerImg={images.bacteria}
            disabled={true}
          />
        </View>
        <SkillTree
          bgcolor="#31BAF9"
          nav={navigation}
          per={0}
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
