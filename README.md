### [EDream](http://edream.kakari.cc), an innovative online learning system.

---

EDream learning system is an application that educates and connects people based on common interests, aiming to assist users in making smart decisions and turning everyday commute into fulfilling journeys.

Commuting time is often spent simply waiting to arrive at the destination, leading to an unfulfilling feeling. There is a need for a simple solution to fill this time gap. Our system will automatically create lesson plans and deliver them to the user to be completed at their convenience. 

This system will benefit commuters, giving them the opportunity to explore their varying interests. Our goal is to maximize productivity during downtime to create and bolster communities based around non-career-pursued interests. 

Our product is not stand-alone, as it pulls from pre-existing resources such as online video sites and encyclopedias. The strength of our product comes from the lesson paths, quizzes, and content structure that it contains based on these resources. 





### Developer Comments

Please feel free to add anything you found useful during the development process below.

---

* How do I setup an React Native project?

> See https://reactnative.dev/docs/environment-setup

* How to connect Supabase API to React Native?

> https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native

* How do I install all dependencies for the project?

> You should see a file named `package.json` which contains a list of all dependencies under the project folder. Simply run `npm install` to install them.

* How to run the project in Expo?

> `npx expo start`

* How to run the project in an Android simulator (Reactive Native CLI)?

> Try `npm run android` or `npx react-native run-android` . Make sure you have the path of Android SDK added into your environment variables (see [here](https://developer.android.com/tools/variables)).

* Execution failed for task ':react-native-async-storage_async-storage:compileDebugJavaWithJavac'

> Latest RN (0.73.3) is using Gradle 8.3, which is not compatible with JDK 21. This is not related to Async Storage, but your setup - best to downgrade JDK, 17 is fine
