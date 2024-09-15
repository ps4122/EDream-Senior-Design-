import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const fakeUsers = [
  // Hard coded for demo...  see Friends in frontend
  {
    id: "1",
    username: "MelodyFeustel",
    interests: "I love art, specifially the minimalists...",
  },
  {
    id: "2",
    username: "AngelinaFrancesco",
    interests: "Motor sports are my favorite, I enjo...",
  },
  {
    id: "3",
    username: "SergioPerez",
    interests: "I am a computer scientist, I like his...",
  },
  {
    id: "4",
    username: "EstebanOcon",
    interests: "I would like to learn about Roman h...",
  },
];

const Friends = () => {
  const [potentialFriends, setPotentialFriends] = useState(fakeUsers);

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAddFriend(item)}>
      <View style={styles.friendItem}>
        <View>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.interests}>Interests: {item.interests}</Text>
        </View>
        <Text style={styles.addButton}>Add</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddFriend = (friend) => {
    console.log(`Added ${friend.username} as a friend!`);
    // For demo purposes remove added friend from potential friends list
    setPotentialFriends(
      potentialFriends.filter((user) => user.id !== friend.id)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Potential Friends</Text>
      <FlatList
        data={potentialFriends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flatList: {
    width: "100%",
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  interests: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default Friends;
