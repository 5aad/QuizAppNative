import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Image, ScrollView} from 'react-native';
import QuestionAppBar from '../components/QuestionAppBar';
import {Title, Button, Card} from 'react-native-paper';
import images from '../api/images';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
const questions = [
  {
    questionText: 'what is cell',
    answerOptions: [
      {answerText: 'Nucleus', isCorrect: false},
      {answerText: 'Mitochondria', isCorrect: true},
      {answerText: 'Ribosomes', isCorrect: false},
      {answerText: 'Sdbosomes', isCorrect: false},
    ],
  },

  {
    questionText:
      'Which of the following signaling is involved in Paracrine signaling?',
    answerOptions: [
      {answerText: 'Four', isCorrect: false},
      {answerText: 'Five', isCorrect: false},
      {answerText: 'Eight', isCorrect: true},
      {answerText: 'Nine', isCorrect: false},
    ],
  },

  {
    questionText: 'How many types of cell signalings are there?',
    answerOptions: [
      {answerText: 'Chemicals signaling', isCorrect: true},
      {answerText: 'Synaptic transmission', isCorrect: false},
      {answerText: 'Hormonal Communication', isCorrect: false},
      {answerText: 'Hormonal', isCorrect: false},
    ],
  },

  {
    questionText: 'What is Cell signaling?',
    answerOptions: [
      {answerText: 'Chemical signaling', isCorrect: false},
      {answerText: 'Intercellular', isCorrect: true},
      {answerText: 'Intllular', isCorrect: false},
      {answerText: 'None of the above', isCorrect: false},
    ],
  },

  {
    questionText: ' What is a bond between amino acids called?',
    answerOptions: [
      {answerText: ' Ionic bond', isCorrect: false},
      {answerText: 'Acidic bond', isCorrect: false},
      {answerText: 'Peptide bond', isCorrect: true},
      {answerText: 'tide bond', isCorrect: true},
    ],
  },
];
const QuestionScreen = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [opt, setOpt] = useState();
  const [perc, setPerc] = useState(0.2);
  const [colorBorderBtn, setColorBorderBtn] = useState('#00ffff');
  const [colorBgBtn, setColorBgBtn] = useState('#00ffff47');
  const [btnDisable, setBtnDisable] = useState(true);
  const [checkAnswer, setCheckAnwer] = useState(false);
  const [correct, setCorrect] = useState(1);
  const [wrong, setWrong] = useState(1);
  const [clickedNext, setClickedNext] = useState(0);

  const [enableNext, setEnableNext] = useState(false);

  const setData = async () => {
    try {
      await AsyncStorage.setItem(`one_one${id}`, perc.toString());
    } catch (e) {
      console.log(e);
    }
  };

  const setEnable = async () => {
    try {
      // console.log(id,'id saved')
      await AsyncStorage.setItem('enableNext', id.toString());
    } catch (e) {
      console.log(e);
    }
  };

  const handleNextButton = () => {
    setClickedNext((prev) => prev + 1);

    const nextQuestion = currentQuestion + 1;
    const increment = perc + 0.2;
    if (nextQuestion < questions.length) {
      this.RBSheet.close();
      setCurrentQuestion(nextQuestion);
      setPerc(increment);
      setCheckAnwer(false);
      setColorBgBtn('#00ffff47');
      setColorBorderBtn('#00ffff');
      setBtnDisable(true);
    } else {
      setEnableNext(true);
      console.log('true', JSON.stringify(id));
      setEnable();

      setData();
      this.RBSheet.close();
      navigation.goBack();
      setCurrentQuestion(0);
      setPerc(0.2);
    }
  };

  const handleCheckButton = () => {
    const green = correct + 1;
    const red = wrong + 1;
    if (checkAnswer === true) {
      this.RBSheet.open();
      setColorBorderBtn('#03ac13');
      setColorBgBtn('#03ac13');
      setCorrect(green);
    } else if (checkAnswer === false) {
      this.RBSheet.open();
      setColorBorderBtn('#e60026');
      setColorBgBtn('#e60026');
      setWrong(red);
    } else {
      alert('something wrong!');
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <QuestionAppBar per={perc} green={correct} red={wrong} id={id} />

        <ScrollView contentContainerStyle={styles.subContainer}>
          <Title style={styles.que}>
            {' '}
            {questions[currentQuestion].questionText}
          </Title>
          <Image style={styles.tinyLogo} source={images.quest} />
          {questions[currentQuestion].answerOptions.map((answerOption, id) => (
            <Card
              key={id}
              onPress={() => {
                setOpt(answerOption.answerText);
                setCheckAnwer(answerOption.isCorrect);
                setBtnDisable(false);
                setColorBorderBtn('#00ffff');
                setColorBgBtn('#00ffff47');
              }}
              style={[
                styles.surface,
                opt === answerOption.answerText ? styles.active : '',
              ]}>
              <Title style={{color: '#2db7ff'}}>
                {answerOption.answerText}
              </Title>
            </Card>
          ))}
        </ScrollView>

        <View style={styles.btnContainer}>
          <Button
            style={[styles.btn]}
            color={'#03ac13'}
            disabled={btnDisable}
            contentStyle={styles.btnImgInner}
            labelStyle={[styles.btnTxt]}
            mode="contained"
            onPress={() => handleCheckButton()}>
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
              backgroundColor: 'transparent',
            },
            container: {
              justifyContent: 'flex-end',
              paddingHorizontal: 40,
            },
          }}>
          {questions[currentQuestion].answerOptions.map(
            (answerOption, id) =>
              answerOption.isCorrect === true && (
                <Title key={id} style={{color: colorBorderBtn}}>
                  Correct Answer: {answerOption.answerText}
                </Title>
              ),
          )}
          <Button
            style={[styles.btns, {borderColor: colorBorderBtn}]}
            color={colorBgBtn}
            disabled={btnDisable}
            contentStyle={styles.btnImgInner}
            labelStyle={[styles.btnTxt]}
            mode="contained"
            onPress={handleNextButton}>
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
    backgroundColor: 'white',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  que: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnImgInner: {
    height: 50,
  },
  btnContainer: {
    justifyContent: 'flex-end',
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
    color: '#fff',
    fontWeight: 'bold',
  },
  surface: {
    padding: 8,
    height: 50,
    width: 300,
    alignItems: 'flex-start',
    justifyContent: 'center',

    borderColor: '#999999',
    borderWidth: 2,
    marginVertical: 8,
    borderRadius: 10,
  },
  active: {
    backgroundColor: '#b3ecff',
    borderColor: '#80dfff',
  },
  tinyLogo: {
    height: 200,
    width: 200,
    marginVertical: 20,
  },
});

export default QuestionScreen;
