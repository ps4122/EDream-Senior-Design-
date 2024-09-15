import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../api/supabase";

const interests = [
  "technology",
  "art",
  "cooking_and_baking",
  // "design",
  // "marketing",
  // "photography_and_videology",
  // "language",
  // "fitness_and_nutrition",
  // "finance_and_investing",
  // "history",
];

const Recommendation = () => {
  const navigation = useNavigation();

  const [contents, setContents] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchContents(interests);
    // console.log(Object.keys(contents));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const navigateToContentDetail = (uuid) => {
    navigation.navigate("ArticleView", { uuid });
  };

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  async function fetContentsBasedOnInterest(interest) {
    let { data: query } = await supabase
      .from("Content_Tags")
      .select(`Content(*)`)
      .eq("tag", interest);
    // Only serve two articles for each interests
    shuffle(query);
    query = query?.slice(-2);

    setContents({
      ...contents,
      [interest]: query.map((entry) => {
        console.log(interest, ":", entry.Content.title);
        return entry.Content;
      }),
    });
  }

  function fetchContents(interests) {
    interests.forEach((interest) => {
      setTimeout(() => {}, 200);
      fetContentsBasedOnInterest(interest);
    });
  }

  useEffect(() => {
    fetchContents(interests);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {interests.map((interest) => (
        <View key={interest} style={styles.section}>
          {contents[interest]?.length > 0 ? (
            <Text style={styles.sectionTitle}>
              Because you are interested in {interest.replace(/[#_]/g, " ")}:
            </Text>
          ) : (
            <></>
          )}

          {contents[interest]?.map((content) => (
            <TouchableOpacity
              key={content.uuid}
              style={styles.contentItem}
              onPress={() => navigateToContentDetail(content.uuid)}
            >
              <Text style={styles.title}>{content.title}</Text>
              <Text style={styles.description}>
                {content.description.length <= 200
                  ? content.description
                  : content.description.slice(0, 200) + "..."}
              </Text>
              {/* https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786 */}
              {/* <Text style={styles.length}>{content.length} words</Text> */}
              <Text style={styles.length}>
                {Math.floor(content.length / 238)} minutes
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  contentItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
});

export default Recommendation;
