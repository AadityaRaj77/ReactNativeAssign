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
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_CHALLENGES_KEY = "darely:userChallenges";
const LAST_OPENED_KEY = "darely:lastOpened";

export default function HomeScreen({ navigation, route }) {
  const [challenges, setChallenges] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadChallenges() {
    try {
      const createdRaw = await AsyncStorage.getItem(USER_CHALLENGES_KEY);
      const created = createdRaw ? JSON.parse(createdRaw) : [];

      const lastOpenedRaw = await AsyncStorage.getItem(LAST_OPENED_KEY);
      const lastOpened = lastOpenedRaw ? JSON.parse(lastOpenedRaw) : {};

      const combined = [...created, ...challengesData];

      const createdIdSet = new Set(created.map((c) => c.id));

      combined.sort((a, b) => {
        const la = lastOpened[a.id] || 0;
        const lb = lastOpened[b.id] || 0;

        if (la !== lb) return lb - la;

        const aIsCreated = createdIdSet.has(a.id);
        const bIsCreated = createdIdSet.has(b.id);
        if (aIsCreated && !bIsCreated) return -1;
        if (!aIsCreated && bIsCreated) return 1;

        return 0;
      });

      setChallenges(combined);
    } catch (err) {
      console.warn("Error loading challenges:", err);
      setChallenges(challengesData);
    }
  }

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      loadChallenges();
    });

    loadChallenges();

    return unsub;
  }, [navigation]);

  useEffect(() => {
    if (route?.params?.fromCreate) {
      loadChallenges();
      navigation.setParams({ fromCreate: undefined });
    }
  }, [route?.params?.fromCreate, navigation]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadChallenges();
    setTimeout(() => setRefreshing(false), 200);
  }, []);

  async function openDetails(item) {
    try {
      const now = Date.now();

      const lastOpenedRaw = await AsyncStorage.getItem(LAST_OPENED_KEY);
      const lastOpened = lastOpenedRaw ? JSON.parse(lastOpenedRaw) : {};
      lastOpened[item.id] = now;
      await AsyncStorage.setItem(LAST_OPENED_KEY, JSON.stringify(lastOpened));

      const createdRaw = await AsyncStorage.getItem(USER_CHALLENGES_KEY);
      const created = createdRaw ? JSON.parse(createdRaw) : [];
      const combined = [...created, ...challengesData];
      const createdIdSet = new Set(created.map((c) => c.id));

      combined.sort((a, b) => {
        const la = lastOpened[a.id] || 0;
        const lb = lastOpened[b.id] || 0;

        if (la !== lb) return lb - la;

        const aIsCreated = createdIdSet.has(a.id);
        const bIsCreated = createdIdSet.has(b.id);
        if (aIsCreated && !bIsCreated) return -1;
        if (!aIsCreated && bIsCreated) return 1;

        return 0;
      });

      setChallenges(combined);
    } catch (err) {
      console.warn("Failed to mark lastOpened:", err);
    }

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
        ListEmptyComponent={() => (
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#9ca3af" }}>No challenges yet.</Text>
          </View>
        )}
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
