import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  function accept() {
    Alert.alert("Success", "You accepted this challenge!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.meta}>
          Category: <Text style={styles.bold}>{item.category}</Text>
        </Text>
        <Text style={styles.meta}>
          Difficulty: <Text style={styles.bold}>{item.difficulty}</Text>
        </Text>

        <View style={{ marginTop: 20 }}>
          <Button title="Accept Challenge" onPress={accept} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071229", padding: 16 },
  card: { backgroundColor: "#0b1220", padding: 18, borderRadius: 12 },
  title: { color: "#ffffff", fontSize: 20, fontWeight: "800" },
  desc: { color: "#c7d2fe", marginTop: 12 },
  meta: { color: "#9ca3af", marginTop: 12 },
  bold: { color: "#ffffff", fontWeight: "700" },
});
