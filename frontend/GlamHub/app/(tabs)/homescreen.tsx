import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons"; // Import icons

const CreatePostScreen = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // Pick Image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Submit post to the backend
  const submitPost = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date);

    // If image selected, append image to FormData
    if (image) {
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: image,
        name: filename,
        type: type,
      });
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        alert("Post created successfully!");
        setDescription("");
        setImage(null);
        setLocation("");
        setDate(new Date().toISOString().slice(0, 10));
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while creating post");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://example.com/profile-pic.png" }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.username}>Dilki Miranda</Text>
          <Text style={styles.privacy}>Public</Text>
        </View>
      </View>

      {/* Description Input */}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Type your description..."
        placeholderTextColor="#b8a5ab"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Buttons Section */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Ionicons name="image-outline" size={24} color="#d09cac" />
        <Text style={styles.buttonText}>Photo/Video</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="location-outline" size={24} color="#d09cac" />
        <Text style={styles.buttonText}>Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="calendar-outline" size={24} color="#d09cac" />
        <Text style={styles.buttonText}>Date</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={submitPost}>
        <Text style={styles.submitButtonText}>Submit Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#311b32", // Purple background outside the white card
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#ffffff", // White background for card area
    padding: 15,
    borderRadius: 20, // Rounded white background corners
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b2e44",
  },
  privacy: {
    fontSize: 14,
    color: "#b8a5ab", // Light gray color for the "Public" text
  },
  descriptionInput: {
    height: 180,
    borderColor: "#d09cac", // Light pink border color
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15, // Rounded corners for input field
    color: "#4b2e44", // Text color matching theme
    backgroundColor: "#fff", // White input background
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e3ea", // Light pink button background
    padding: 15,
    borderRadius: 25, // Rounded buttons
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#4b2e44", // Dark text color on button
    fontWeight: "bold",
    marginLeft: 10, // Space between icon and text
  },
  previewImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#d09cac", // Darker pink submit button
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#ffffff", // White text for submit button
    fontWeight: "bold",
  },
});

export default CreatePostScreen;
