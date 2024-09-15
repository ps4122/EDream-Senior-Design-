import React, { useState } from "react";
import { supabase } from "../api/supabase";

import { StyleSheet, Button, View, Text } from "react-native";

const DebugPage = ({ navigation }) => {
  // const [titles, setTitles] = useState<string[]>([]);
  const [titles, setTitles] = useState("placeholder");

  async function retrieveContent() {
    let data = await supabase.from("Content").select();
    // console.log("Titles", data);
    // data = data.data;
    try {
      data = data["data"][0]["title"];
    } catch (error) {
      console.log("Error", error);
    }
    setTitles(data);
  }

  return (
    <View>
      <Text style={styles.header}>Debug Page.</Text>
      <Button title="Debug" onPress={() => retrieveContent()} />
      <Text>{titles}</Text>

      <Button
        title="Jump to Profile"
        onPress={() => navigation.navigate("Profile", { name: "ExampleUser" })}
      />
      <Button
        title="Login Form"
        onPress={() => navigation.navigate("Login", {})}
      />
      <Button title="Quiz" onPress={() => navigation.navigate("Quiz", {})} />
      <Button
        title="Quiz Result"
        onPress={() => navigation.navigate("QuizResult", {})}
      />
      <Button
        title="WikipediaArticle"
        onPress={() => navigation.navigate("WikipediaArticle", {})}
      />
      <Button
        title="Landing Page"
        onPress={() => navigation.navigate("Landing Page", {})}
      />
      <Button
        title="Pathway Page"
        onPress={() => navigation.navigate("Pathway", {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  heroSection: {
    alignItems: "center",
    padding: 20,
  },
  heroText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DebugPage;
