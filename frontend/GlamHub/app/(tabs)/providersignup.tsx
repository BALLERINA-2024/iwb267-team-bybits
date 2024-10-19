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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
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
        "http://192.168.9.20:8080/signup/signupservice",
        {
          username: name,
          phoneNumber: phoneNumber,
          email: email,
          location: location,
          password: password,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "User signed up successfully");
        setName("");
        setPhoneNumber("");
        setEmail("");
        setLocation("");
        setPassword("");
        setConfirmPassword("");
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
        <Text style={styles.title}>Sign UP</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Conform Password" // Keeping the typo for consistency
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign UP</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Link href="/loginprovider">
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
    padding: 20,
  },
  signupBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
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
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  signupButton: {
    backgroundColor: "#D48B9E",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  signupButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    color: "#6B3653",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
