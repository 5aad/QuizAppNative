import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import QuestionAppBar from "../components/QuestionAppBar";
import { Title, Button, Card } from "react-native-paper";
import images from "../api/images";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuestionScreen = ({ route }) => {
  const { topic } = route.params;
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [opt, setOpt] = useState();
  const [perc, setPerc] = useState(0);
  const [correct, setCorrect] = useState(1);
  const [wrong, setWrong] = useState(1);
  const [answered, setAnswered] = useState(false);
  const { questions } = topic;

  const handleNextButton = () => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    const increment = (currentQuestion + 1) / questions.length;
    setOpt("");
    if (questions[nextQuestion]) {
      this.RBSheet.close();
      setPerc(increment);
      setAnswered(false);
    } else {
      this.RBSheet.close();
      navigation.goBack();
      setCurrentQuestion(0);
      setPerc(0.2);
    }
  };

  const handleCheckButton = async () => {
    setAnswered(true);
    await AsyncStorage.setItem(
      `${topic.name}perc`,
      (((currentQuestion + 1) / questions.length) * 100).toString()
    );

    if (opt == questions[currentQuestion].answer) {
      const green = correct + 1;

      setCorrect(green);
    } else {
      const red = wrong + 1;
      setWrong(red);
    }

    this.RBSheet.open();
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <QuestionAppBar per={perc} green={correct} red={wrong} />

        <ScrollView contentContainerStyle={styles.subContainer}>
          <Title style={styles.que}>
            {questions[currentQuestion].Question}
          </Title>
          {questions[currentQuestion].image ? (
            <Image
              style={styles.tinyLogo}
              source={questions[currentQuestion].image}
            />
          ) : (
            <View></View>
          )}

          {questions[currentQuestion].type == 1 ? (
            questions[currentQuestion].options.map((answerOption, id) => (
              <Card
                key={id}
                onPress={() => {
                  setOpt(answerOption);
                }}
                style={[
                  styles.surface,
                  opt === answerOption ? styles.active : "",
                ]}
              >
                <Title style={{ color: "#2db7ff", fontSize: 12 }}>
                  {answerOption}
                </Title>
              </Card>
            ))
          ) : (
            <Card
              key={questions[currentQuestion].id}
              onPress={() => {
                setOpt(answerOption);
              }}
              style={[styles.surface, { height: 100 }]}
            >
              <TextInput
                value={opt}
                onChangeText={(val) => setOpt(val)}
                placeholder="Enter you answer here"
                multiline
              />
            </Card>
          )}
        </ScrollView>

        <View style={styles.btnContainer}>
          <Button
            style={[styles.btn]}
            color={"#03ac13"}
            disabled={opt ? false : true}
            contentStyle={styles.btnImgInner}
            labelStyle={[styles.btnTxt]}
            mode="contained"
            onPress={() => handleCheckButton()}
          >
            check
          </Button>
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={150}
          openDuration={250}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            container: {
              justifyContent: "flex-end",
              paddingHorizontal: 40,
            },
          }}
        >
          <Title
            style={{
              color:
                answered && opt == questions[currentQuestion].answer
                  ? "#03ac13"
                  : "#e60026",
            }}
          >
            Correct Answer: {questions[currentQuestion].answer}
          </Title>

          <Button
            style={[
              styles.btns,
              {
                borderColor:
                  answered && opt == questions[currentQuestion].answer
                    ? "#03ac13"
                    : "#e60026",
              },
            ]}
            color={
              answered && opt == questions[currentQuestion].answer
                ? "#03ac13"
                : "#e60026"
            }
            disabled={answered ? false : true}
            contentStyle={styles.btnImgInner}
            labelStyle={[styles.btnTxt]}
            mode="contained"
            onPress={handleNextButton}
          >
            Continue
          </Button>
        </RBSheet>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  que: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnImgInner: {
    height: 50,
  },
  btnContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: 40,
  },
  btn: {
    marginVertical: 20,
    borderWidth: 1,
  },
  btns: {
    marginBottom: 20,
    borderWidth: 1,
    marginTop: 10,
  },
  btnTxt: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  surface: {
    padding: 8,
    height: 50,
    width: 300,
    alignItems: "flex-start",
    justifyContent: "center",

    borderColor: "#999999",
    borderWidth: 2,
    marginVertical: 8,
    borderRadius: 10,
  },
  active: {
    backgroundColor: "#b3ecff",
    borderColor: "#80dfff",
  },
  tinyLogo: {
    height: 200,
    width: 200,
    marginVertical: 20,
  },
});

export default QuestionScreen;
