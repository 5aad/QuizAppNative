import React from 'react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import QuestionScreen from './screens/QuestionScreen';
import TopicScreen from './screens/TopicScreen';
import RegisterScreen from './screens/RegisterScreen';
import BoardScreen from './screens/BoardScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabBar from './BottomTabBar';
import TreeScreen from './screens/TreeScreen';
import PDFView from './screens/PDFView';
import ProfileScreen from './screens/ProfileScreen';
import StartedScreen from './screens/StartedScreen';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Started"
          component={StartedScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Bottom"
          component={BottomTabBar}
        />

        <Stack.Screen
          name="Topic"
          component={TopicScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Board"
          component={BoardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Question"
          component={QuestionScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Tree"
          component={TreeScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PDF"
          component={PDFView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
