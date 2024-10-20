import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

// Array of images for the slideshow
const images = [
  require("@/assets/images/L_4.png"),
  require("@/assets/images/L_5.png"),
  require("@/assets/images/L_3.png"),
];

const home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Slideshow effect: change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome Again!</Text>

      {/* Slideshow Section in Transparent Box */}
      <View style={styles.slideshowContainer}>
        <Image source={images[currentImageIndex]} style={styles.image} />
      </View>

      {/* Icons and Sections in Transparent Box */}
      <View style={styles.iconBox}>
        <View style={styles.iconRow}>
          {/* Post Section */}
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="edit" size={50} color="#fff" />
            <Link href="/homescreen">
              <Text style={styles.iconText}>Post</Text>
            </Link>
          </TouchableOpacity>

          {/* Service Section */}
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="cut" size={50} color="#fff" />
            <Link href="/homescreen">
              <Text style={styles.iconText}>Service</Text>
            </Link>
          </TouchableOpacity>

          {/* Products Section */}
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="shopping-bag" size={50} color="#fff" />
            <Link href="/homescreen">
              <Text style={styles.iconText}>Products</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome5 name="gift" size={40} color="#fff" />
          <Text style={styles.footerText}>Beauty Tips for All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 28, // Large font size
    fontWeight: "bold",
    marginBottom: 20, // Space between text and slideshow
    color: "#422A3C", // Purple color for welcome text
  },
  slideshowContainer: {
    backgroundColor: "rgba(200, 150, 180, 0.3)", // Transparent purple background
    padding: 20,
    borderRadius: 30,
    marginBottom: 30, // Space between slideshow and icons
  },
  image: {
    width: screenWidth * 0.9, // Slightly increased width
    height: 250,
    borderRadius: 20,
  },
  iconBox: {
    backgroundColor: "rgba(200, 150, 180, 0.3)", // Transparent purple background
    padding: 20,
    borderRadius: 30,
    width: "90%", // Adjust width to fit icons within the box
    alignItems: "center",
    justifyContent: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  iconContainer: {
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "#C896B4", // Purple color with no transparency (solid)
    borderRadius: 30,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  iconText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  footer: {
    marginTop: 40,
  },
  footerButton: {
    alignItems: "center",
    padding: 15,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#422A3C",
  },
});

export default home;
