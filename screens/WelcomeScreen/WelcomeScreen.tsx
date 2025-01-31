// WelcomeScreen.tsx
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import styles from './styles';
import { RootStackParamList } from './constants';

export default function WelcomeScreen() {
  const navigation: NavigationProp<RootStackParamList, 'Welcome'> = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/welcome.png")}
        style={styles.backgroundImage}
      />

      <StatusBar style="light" />

      <View style={styles.titleContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>RC</Text>
        </View>
        <Text style={styles.movieCinemaTitle}>RuCinema</Text>
        <Text style={styles.subtitle}>
          Смотрите и находите фильмы, которые поднимут вам настроение.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Movies')}>
          <Text style={styles.buttonText}>Смотреть</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
