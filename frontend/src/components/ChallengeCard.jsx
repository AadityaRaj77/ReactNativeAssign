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

  function handlePressIn() {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  }
  function handlePressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ marginVertical: 8 }}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.category}</Text>
          </View>
        </View>
        <Text numberOfLines={2} style={styles.desc}>
          {item.description}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0b1220",
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  desc: { color: "#bfc9d6", marginTop: 8 },
  tag: {
    backgroundColor: "#1f2937",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: { color: "#9ca3af", fontSize: 12 },
});
