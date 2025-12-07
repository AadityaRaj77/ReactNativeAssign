import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const USER_CHALLENGES_KEY = "darely:userChallenges";
const LAST_OPENED_KEY = "darely:lastOpened";

export default function CreateChallengesScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  async function submit() {
    if (!title.trim() || !desc.trim() || !category.trim())
      return alert("Fill all fields");

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: desc.trim(),
      category: category.trim(),
      difficulty: "Easy",
    };

    const existingRaw = await AsyncStorage.getItem(USER_CHALLENGES_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift(newItem);
    await AsyncStorage.setItem(USER_CHALLENGES_KEY, JSON.stringify(existing));

    const now = Date.now();
    const loRaw = await AsyncStorage.getItem(LAST_OPENED_KEY);
    const lastOpened = loRaw ? JSON.parse(loRaw) : {};
    lastOpened[newItem.id] = now;
    await AsyncStorage.setItem(LAST_OPENED_KEY, JSON.stringify(lastOpened));

    navigation.navigate("Home", { fromCreate: now });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="#555"
          style={styles.input}
        />

        <Text style={styles.label}>Short Description</Text>
        <TextInput
          value={desc}
          onChangeText={setDesc}
          multiline
          placeholder="Describe challenge"
          placeholderTextColor="#555"
          style={[styles.input, { height: 110 }]}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="Fitness, Creativity..."
          placeholderTextColor="#555"
          style={styles.input}
        />

        <TouchableOpacity onPress={submit}>
          <LinearGradient
            colors={["#2DE1FC", "#FF0080"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Create Challenge</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
  form: {
    backgroundColor: "#0A0A0A",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  label: { color: "#AAAAAA", marginBottom: 6, fontSize: 13 },
  input: {
    backgroundColor: "#050505",
    color: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#000", fontWeight: "900", fontSize: 15 },
});
