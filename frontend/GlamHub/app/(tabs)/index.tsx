import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Landing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circleBackground}>
        <View style={styles.circleImage}>
          <Image
            source={require("@/assets/images/L_1.png")}
            style={styles.image}
          />
        </View>
      </View>
      <Text style={styles.description}>Get experience with GlamHub</Text>
      <TouchableOpacity style={styles.customerButton}>
        <Link href="/landing_2">
          <Text style={styles.buttonText}>Get Start</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#422A3C", // Dark purple background
  },
  circleImage: {
    width: 300, // Circle width
    height: 300, // Circle height
    justifyContent: "center", // Center the image horizontally
    alignItems: "center", // Center the image vertically
    borderRadius: 150, // Make the container circular
    overflow: "hidden", // Ensure the image stays within the circle
    marginTop: 30,
  },
  image: {
    width: "100%", // Fill the width of the circle
    height: "100%", // Fill the height of the circle
    resizeMode: "cover", // Ensure the image covers the circle without distortion
  },
  description: {
    color: "white",
    fontSize: 18,
    marginBottom: 70,
    textAlign: "center", // Center the text horizontally
    fontWeight: "bold",
  },
  customerButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    width: 300,
    alignItems: "center", // Center the button text
    marginTop: 20,
  },
  buttonText: {
    color: "#422A3C", // Dark purple text color
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Landing;
