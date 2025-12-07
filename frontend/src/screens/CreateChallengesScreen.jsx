import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_CHALLENGES_KEY = "darely:userChallenges";

export default function CreateChallengesScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  async function submit() {
    if (!title.trim() || !desc.trim() || !category.trim()) {
      return Alert.alert("Error", "Please enter all fields");
    }
    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: desc.trim(),
      category: category.trim(),
      difficulty: "Easy",
    };

    try {
      const raw = await AsyncStorage.getItem(USER_CHALLENGES_KEY);
      const existing = raw ? JSON.parse(raw) : [];

      existing.unshift(newItem);

      await AsyncStorage.setItem(USER_CHALLENGES_KEY, JSON.stringify(existing));

      Alert.alert("Success", "Challenge added!");
      navigation.goBack();
    } catch (err) {
      console.warn(err);
      Alert.alert("Error", "Could not save challenge");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
        <Text style={styles.label}>Short description</Text>
        <TextInput
          placeholder="Short description"
          value={desc}
          onChangeText={setDesc}
          style={[styles.input, { height: 120 }]}
          multiline
          placeholderTextColor="#9ca3af"
        />
        <Text style={styles.label}>Category</Text>
        <TextInput
          placeholder="Category (e.g. Fitness, Creativity)"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />

        <View style={{ marginTop: 8 }}>
          <Button title="Create" onPress={submit} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071229", padding: 16 },
  form: { backgroundColor: "#0b1220", padding: 12, borderRadius: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#071829",
    color: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: { color: "#9ca3af", marginBottom: 6, fontSize: 13 },
});
