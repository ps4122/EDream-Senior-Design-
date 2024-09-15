import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../api/supabase";
import LoginForm from "./LoginForm";
import { TextInput } from "react-native-gesture-handler";

const UserProfile = () => {
  const navigation = useNavigation();

  const [userMeta, setUserMeta] = useState({});
  const [interestStatement, setInterestStatement] = useState(
    "History is a subject I love in school.  I enjoy learning about computer science history and the Russian revolution."
  );

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a current session (i.e., if the user is logged in)
    const session = supabase.auth.getSession();
    setLoggedIn(session !== null);

    // Handle auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setLoggedIn(event === "SIGNED_IN" || session !== null);
      }
    );

    (async function IIFE() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserMeta(user?.user_metadata || {});
    })();

    // Cleanup subscription on component unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!loggedIn) return <LoginForm />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
        <Text style={styles.username}>{userMeta?.email}</Text>
        <Text style={styles.score}>Learning points: 310</Text>
      </View>

      <View style={styles.interestsContainer}>
        <TextInput
          label="Interest Statement."
          value={interestStatement || ""}
          multiline
          numberOfLines={3}
          onChangeText={(text) => setInterestStatement(text)}
        />
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("Friends")}
        >
          <Icon name={"account-group"} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("ProfileScreen")}
        >
          <Icon name={"archive"} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("LoginForm")}
        >
          <Icon name={"account-edit"} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  score: {
    fontSize: 18,
    color: "gray",
  },
  interestsContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  interestsText: {
    fontSize: 16,
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
});

export default UserProfile;
