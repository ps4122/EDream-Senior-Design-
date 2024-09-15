import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TakeQuiz from "../pages/TakeQuiz";
import QuizResult from "../pages/QuizResult";
import Recommendation from "../pages/Recommendation";
import ArticleView from "../pages/ArticleView";
import Pathway from "../pages/Pathway";

const Stack = createStackNavigator();

export default function LearnStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Recommendation" component={Recommendation} />
      <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
      <Stack.Screen name="QuizResult" component={QuizResult} />
      <Stack.Screen name="ArticleView" component={ArticleView} />
      <Stack.Screen name="Pathway" component={Pathway} />
    </Stack.Navigator>
  );
}
