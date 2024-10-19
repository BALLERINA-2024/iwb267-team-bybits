import React, { useState } from "react";
import { Link } from "expo-router";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // Send POST request to Ballerina backend
      const response = await axios.post(
        "http://192.168.9.20:8080/signup/signup",
        {
          username: name,
          password: password,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "User signed up successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert("Error", "User already exists");
      } else {
        Alert.alert("Error", "An error occurred during sign up");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupBox}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Link href="/login">
              <Text style={styles.loginText}>Login</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6B3653",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  signupBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
    height: "90%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6B3653",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#D48B9E",
    marginBottom: 80,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: "#D48B9E",
    paddingVertical: 10,
    borderRadius: 10,
    height: 50,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  signupButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 45,
  },
  loginText: {
    color: "#6B3653",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
