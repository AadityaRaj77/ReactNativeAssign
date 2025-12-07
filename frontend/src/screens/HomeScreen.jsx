import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
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
    } catch {
      setChallenges(challengesData);
    }
  }

  useEffect(() => {
    const unsub = navigation.addListener("focus", loadChallenges);
    loadChallenges();
    return unsub;
  }, [navigation]);

  useEffect(() => {
    if (route?.params?.fromCreate) {
      loadChallenges();
      navigation.setParams({ fromCreate: undefined });
    }
  }, [route?.params?.fromCreate]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadChallenges();
    setTimeout(() => setRefreshing(false), 200);
  }, []);

  async function openDetails(item) {
    const now = Date.now();

    const raw = await AsyncStorage.getItem(LAST_OPENED_KEY);
    const lastOpened = raw ? JSON.parse(raw) : {};
    lastOpened[item.id] = now;
    await AsyncStorage.setItem(LAST_OPENED_KEY, JSON.stringify(lastOpened));

    navigation.navigate("Details", { item });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <Text style={styles.title}>DARELY</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={styles.createText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={challenges}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
        renderItem={({ item }) => (
          <ChallengeCard item={item} onPress={() => openDetails(item)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#2DE1FC"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  title: { color: "#FFFFFF", fontSize: 28, fontWeight: "900" },
  createBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#2DE1FC",
  },
  createText: { color: "#000", fontWeight: "800" },
});
