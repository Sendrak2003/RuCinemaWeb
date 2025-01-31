import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#593EFF", }}>
      <ActivityIndicator size="large" color="#FAFAFA" />
      <Text style={{color:"#FAFAFA"}}>Загрузки...</Text>
    </View>
  );
}