import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  function accept() {
    alert("You accepted this challenge!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{item.category}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Difficulty</Text>
          <Text style={styles.value}>{item.difficulty}</Text>
        </View>

        <TouchableOpacity onPress={accept} style={{ marginTop: 30 }}>
          <LinearGradient
            colors={["#2DE1FC", "#FF0080"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>DO IT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
  box: {
    backgroundColor: "#0A0A0A",
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  title: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  desc: { color: "#CFCFCF", marginTop: 14, fontSize: 15, lineHeight: 22 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  label: { color: "#AAAAAA" },
  value: { color: "#FFFFFF", fontWeight: "700" },
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#000", fontSize: 16, fontWeight: "800" },
});
