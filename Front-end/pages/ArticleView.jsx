import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReadPdf from "../components/PDF";
import { supabase } from "../api/supabase";
import { TouchableOpacity } from "react-native-gesture-handler";

const ArticleView = ({ route }) => {
  const navigation = useNavigation();
  const uuid = route.params.uuid;
  const fromPathway = route.params.fromPathway;

  const [article, setArticles] = useState({});

  // const scrollViewRef = useRef(null); // Create a ref for ScrollView

  // const [reachedEnd, setReachedEnd] = useState(false);

  // const handleScroll = (event) => {
  //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  //   const isEnd =
  //     layoutMeasurement.height + contentOffset.y >= contentSize.height;
  //   setReachedEnd(isEnd);
  // };

  // const handleContinueReading = () => {
  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to top
  //   }
  // };

  useEffect(() => {
    (async function IIFE() {
      const { data: query } = await supabase
        .from("Content")
        .select()
        .eq("uuid", uuid);
      setArticles(query?.[0]);
    })();
  }, []);

  return (
    <View>
      <View style={styles.promptBox}>
        <Text style={styles.title}>{article?.title}</Text>
        <Text style={styles.description}>{article?.description}</Text>
      </View>
      <ReadPdf />
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>
          {fromPathway ? "" : "Finished with the content?"}
        </Text>
        <Text style={styles.promptText}>
          {fromPathway ? "" : "Test your knowledge with a short quiz!"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(fromPathway ? "Pathway" : "TakeQuiz", { uuid })
        }
      >
        <Text style={styles.buttonText}>
          {fromPathway ? "Return to Pathway" : "Take Quiz"}
        </Text>
      </TouchableOpacity>
    </View>
    // <View style={{ flex: 1 }}>
    //   <ScrollView
    //     ref={scrollViewRef} // Assign the ref to ScrollView
    //     style={{ flex: 1 }}
    //     onScroll={handleScroll}
    //     scrollEventThrottle={16}
    //   >
    //     <Text>{articleContent}</Text>
    //   </ScrollView>
    //   {reachedEnd && (
    //     <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
    //       <Button title="Take Quiz" onPress={handleTakeQuiz} />
    //       <Button title="Reread Article" onPress={handleContinueReading} />
    //     </View>
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: "#333",
    alignSelf: "center",
    fontWeight: "bold",
  },
  description: {
    marginTop: 8,
    fontSize: 17,
  },
  promptBox: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  promptText: {
    fontSize: 17,
  },
  button: {
    padding: 16,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ArticleView;
