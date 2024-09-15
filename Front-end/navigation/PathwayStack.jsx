import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Pathway from "../pages/Pathway";
import Recommendation from "../pages/Recommendation";
import TakeQuiz from "../pages/TakeQuiz";
import QuizResult from "../pages/QuizResult";
import ArticleView from "../pages/ArticleView";

const Stack = createStackNavigator();

export default function PathwayStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Pathway" component={Pathway} />
      <Stack.Screen name="Recommendation" component={Recommendation} />
      <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
      <Stack.Screen name="QuizResult" component={QuizResult} />
      <Stack.Screen name="ArticleView" component={ArticleView} />
    </Stack.Navigator>
  );
}
