import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

export default function ChallengeCard({ item, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  }
  function pressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.93}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.row}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.category}</Text>
          </View>

          <View
            style={[
              styles.diff,
              item.difficulty === "Hard"
                ? styles.hard
                : item.difficulty === "Medium"
                ? styles.medium
                : styles.easy,
            ]}
          >
            <Text style={styles.diffText}>{item.difficulty}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000000",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 16,
    shadowColor: "#FF0080",
    shadowOpacity: 0.18,
    shadowRadius: 20,
  },
  title: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  desc: { color: "#CCCCCC", marginTop: 10, fontSize: 13 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    alignItems: "center",
  },
  tag: {
    borderWidth: 1,
    borderColor: "#2DE1FC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: { color: "#2DE1FC", fontWeight: "700", fontSize: 12 },
  diff: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  diffText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  hard: { backgroundColor: "rgba(255,0,128,0.20)" },
  medium: { backgroundColor: "rgba(45,225,252,0.20)" },
  easy: { backgroundColor: "rgba(255,255,255,0.12)" },
});
