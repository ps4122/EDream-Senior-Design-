import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { supabase } from "../api/supabase";

const Friends = ({ userInterests }) => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("name, interests")
          .neq("name", null)
          .in("interests", userInterests)
          .order("random()")
          .limit(5)
          .single(); // Fetch only one random user

        if (error) {
          throw error;
        }

        setRecommendedUsers(data);
      } catch (error) {
        console.error("Error fetching recommended users:", error.message);
      }
    };

    fetchRecommendedUsers();
  }, [userInterests]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommended Users</Text>
      <FlatList
        data={recommendedUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userInterests}>
              {item.interests.join(", ")}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userInterests: {
    fontSize: 14,
    color: "#888",
  },
});

export default Friends;
