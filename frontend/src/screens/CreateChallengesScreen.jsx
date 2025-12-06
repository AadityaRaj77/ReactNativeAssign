import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

export default function CreateChallengesScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function submit() {
    if (!title.trim() || !desc.trim())
      return Alert.alert("Error", "Please enter title and description");
    Alert.alert("Created", "Challenge created locally (demo).");
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
        <TextInput
          placeholder="Short description"
          value={desc}
          onChangeText={setDesc}
          style={[styles.input, { height: 120 }]}
          multiline
          placeholderTextColor="#9ca3af"
        />
        <Button title="Create" onPress={submit} />
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
});
