import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import DividerCircle from "../components/DividerCircle";
import SkillTree from "../components/SkillTree";
import TreeAppBar from "../components/TreeAppBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "../api/images";
// import Questions from "../assets/questions.json";
const Questions = [
  {
    level: "1",
    topics: [
      {
        name: "cells",
        questions: [
          {
            Bubble: "Cells",
            id: 1,
            Question:
              "Prokaryotic cells are significantly smaller than eukaryotic cell. Name another difference between them",
            answer: "Prokaryotic cells do not have nucleus",
            options: [
              "Prokaryotic cells do not have nucleus",
              "Prokaryotic cells do not have cell membrane",
              "Prokaryotic cells are more advanced structures",
              "Prokaryotic cells have chloroplasts",
            ],
            image: require("../assets/ImagesTosend/ATP.jpg"),
            type: 1,
          },
          {
            Bubble: "Cells",
            id: 2,
            Question:
              "Bacterial cells are an example of prokaryotic cells. What is the range in diameter of a bacterium?",
            answer: "0.1 �m - 5 �m",
            options: ["0.1 �m - 5 �m", "1 mm - 10mm", "0.01 nm - 0.1nm", "1cm"],
            image: require("../assets/ImagesTosend/Oxygen.jpg"),
            type: 1,
          },
          {
            Bubble: "Cells",
            id: 3,
            type: 2,
            Question: "This is a test question with text input?",
            answer: "0.1",
            image: require("../assets/ImagesTosend/Oxygen.jpg"),
          },
        ],
      },
    ],
  },
];
const TreeScreen = ({ props, navigation }) => {
  const isFocused = useIsFocused();
  const [days, setDays] = useState("");
  const [header, setHeader] = useState("");

  const setData = async () => {
    const topic = await AsyncStorage.getItem("topic_title");
    setHeader(topic);
    const loginDay = await AsyncStorage.getItem("asyncIncrement");
    if (loginDay !== null) {
      setDays(loginDay);
    }
  };

  useEffect(() => {
    setData();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <TreeAppBar headerName={header} dayss={days} nav={navigation} />
      <ScrollView style={styles.subContainer}>
        {Questions.map((item) => {
          const { topics } = item;
          let counter = 0;

          return (
            <View style={styles.skillContainer}>
              {topics.map((topic) => {
                if (counter == 3) counter = 0;
                const newTr = (
                  <SkillTree
                    bgcolor="#31BAF9"
                    nav={navigation}
                    innerImg={images.bacteria}
                    disabled={false}
                    fullWidth={counter < 1 ? true : false}
                    topic={topic}
                  />
                );
                counter += 1;

                return newTr;
              })}
            </View>
          );
        })}

        {/* 2nd */}
        <DividerCircle
          bgcolor="#31BAF9"
          bdColor="#31BAF9"
          imgStar={images.star}
        />
        {/* <View style={styles.skillContainer}>
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
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  subContainer: {
    flex: 1,
  },
  skillContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
});

export default TreeScreen;
