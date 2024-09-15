import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DebugPage from "../pages/Debug";
import ProfileScreen from "../pages/UserProfile";
import LoginForm from "../pages/LoginForm";
import WikipediaArticleScreen from "../pages/ArticleView";
import TakeQuiz from "../pages/TakeQuiz";
import QuizResult from "../pages/QuizResult";
import UserProfile from "../pages/UserProfile";
import Pathway from "../pages/Pathway";

const Stack = createStackNavigator();

export default function DebugStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={DebugPage}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Profile" component={ProfileScreen} />

      <Stack.Screen
        name="Quiz"
        component={TakeQuiz}
        options={{ title: "Quiz" }}
      />
      <Stack.Screen name="QuizResult" component={QuizResult} />
      <Stack.Screen
        name="WikipediaArticle"
        component={WikipediaArticleScreen}
        options={{ title: "Wikipedia Article" }}
      />
      <Stack.Screen name="Landing Page" component={UserProfile} />
      <Stack.Screen name="Pathway" component={Pathway} />
    </Stack.Navigator>
  );
}
