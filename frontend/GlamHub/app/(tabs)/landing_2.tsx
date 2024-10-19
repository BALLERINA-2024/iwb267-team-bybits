import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Landing_2 = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Welcome to Glamhub</Text>

      <View style={styles.circleImage}>
        <Image
          source={{
            uri: "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg",
          }}
          style={styles.img}
        />
      </View>

      <Text style={styles.description}>Choose your path</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Link href="/signup">
            <Text style={styles.buttonText}>Customer</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Link href="/providersignup">
            <Text style={styles.secondaryButtonText}>Service provider</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#422A3C",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  circleImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // 50% of width/height for a circle
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 5,
    borderColor: "#C896B4",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "column",
    gap: 10, // gap doesn't exist in RN; use margin on buttons instead
  },
  primaryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#C896B4",
    alignItems: "center",
  },
  secondaryButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#C896B4",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  secondaryButtonText: {
    fontSize: 16,
    color: "#C896B4",
  },
});

export default Landing_2;
