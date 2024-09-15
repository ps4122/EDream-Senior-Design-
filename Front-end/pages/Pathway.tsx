import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
} from "react-native";

const Pathway = ({ navigation, route }) => {
  const [unlockedModules, setUnlockedModules] = useState([0]);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);
  const dotOpacities = useRef(
    Array.from({ length: 10 }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    scrollToUnlockedModule(unlockedModules.length - 1);
  }, [unlockedModules]);

  const scrollToUnlockedModule = (index) => {
    if (scrollViewRef.current) {
      const scrollPosition = index * 100;
      scrollViewRef.current.scrollTo({
        y: scrollPosition,
        animated: true,
      });
    }
  };

  const handleModulePress = (index) => {
    if (unlockedModules.includes(index)) {
      console.log(`Opening module ${index}`);
    } else {
      console.log("Module is locked");
    }
  };

  const unlockNextModule = () => {
    const nextModuleIndex = unlockedModules.length;
    if (nextModuleIndex < 10) {
      Animated.timing(dotOpacities[nextModuleIndex], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setUnlockedModules([...unlockedModules, nextModuleIndex]);
    }
    setTimeout(() => {
      navigation.navigate(
        Math.floor(nextModuleIndex / 2) === 0 ? "ArticleView" : "TakeQuiz",
        {
          uuid: "f0068448-9ca2-4d1e-93bf-bd2fc131db6c", // HARDCODED
          fromPathway: true,
        }
      );
    }, 800);
  };

  const handlePathwayPress = () => {
    if (scrollViewRef.current) {
      setPrevScrollPosition(scrollViewRef.current.contentOffset.y);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        vertical
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.interest}>Cooking and Baking</Text>
        {Array.from({ length: 10 }, (_, index) => (
          <View key={index} style={styles.moduleContainer}>
            <TouchableOpacity
              style={styles.landingDot}
              onPress={() => handleModulePress(index)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[styles.dot, { opacity: dotOpacities[index] }]}
              />
            </TouchableOpacity>
            <Text style={styles.moduleText}>
              {index === 0 ? "Introduction" : `Milestone`}
              {/* TODO Replace with acutal article titles */}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.line} />
      <TouchableOpacity style={styles.unlockButton} onPress={unlockNextModule}>
        <Text style={styles.unlockButtonText}>Complete Path</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },
  interest: {
    marginBottom: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: "#CCC",
  },
  scrollViewContent: {
    marginTop: 30,
    paddingBottom: 150,
  },
  moduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  landingDot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2196F3",
  },
  moduleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e0e0e0",
  },
  line: {
    position: "absolute",
    left: 30,
    right: 30,
    height: 1,
    backgroundColor: "#e0e0e0",
    borderStyle: "dotted",
  },
  unlockButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
  },
  unlockButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Pathway;
