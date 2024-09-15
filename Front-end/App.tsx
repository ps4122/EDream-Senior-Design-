import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LearnStack from "./navigation/LearnStack";
import ProfileStack from "./navigation/ProfileStack";
import PathwayStack from "./navigation/PathwayStack";
// import DebugStack from "./navigation/DebugStack";

const Tab = createBottomTabNavigator();
/*Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);*/
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Get Learning":
                iconName = focused ? "school" : "school-outline";
                break;
              case "Your Pathway":
                iconName = focused ? "map" : "map-outline";
                break;
              case "Personal Profile":
                iconName = focused ? "account" : "account-outline";
                break;
              default:
                iconName = "progress-question";
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: false, // hides the label
        })}
      >
        <Tab.Screen name="Get Learning" component={LearnStack} />
        <Tab.Screen name="Your Pathway" component={PathwayStack} />
        <Tab.Screen name="Personal Profile" component={ProfileStack} />
        {/* Comment the following line out to hide the debug page */}
        {/* <Tab.Screen name="Debug" component={DebugStack} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
/*const sendNotification = async () => {
    console.log("Sending push notification...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };*/
export default App;
