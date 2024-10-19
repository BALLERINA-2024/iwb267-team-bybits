import React, { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.9.20:8080/signup/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        Alert.alert("Success", result);
      } else {
        Alert.alert("Error", result);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your credential to Login</Text>

        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          //keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>Don’t have an account? </Text>

          {/* <TouchableOpacity>
            <Link href="/signup">
              <Text style={styles.signupText}>Signup</Text>
            </Link>
          </TouchableOpacity> */}

          <TouchableOpacity>
            <Link href="/homescreen">
              <Text style={styles.signupText}>Home</Text>
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
  loginBox: {
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
  forgotPasswordText: {
    color: "#6B3653",
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#D48B9E",
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 45,
  },
  signupText: {
    color: "#6B3653",
    fontWeight: "bold",
  },
});

export default LoginScreen;
