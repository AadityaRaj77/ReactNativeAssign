import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import ChallengeCard from "../components/ChallengeCard";
import challengesData from "../data/challenges.json";

export default function HomeScreen({ navigation }) {
  const [challenges, setChallenges] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setChallenges(challengesData);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setChallenges((prev) => [...prev].reverse());
      setRefreshing(false);
    }, 800);
  }, []);

  function openDetails(item) {
    navigation.navigate("Details", { item });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Daily Challenges</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Text style={styles.create}>+ Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={challenges}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ChallengeCard item={item} onPress={() => openDetails(item)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071229" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerTitle: { color: "#ffffff", fontSize: 22, fontWeight: "800" },
  create: { color: "#60a5fa", fontWeight: "600" },
});
