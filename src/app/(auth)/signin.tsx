import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Button from "@components/Button";
import React, { useState } from "react";
import Colors from "@constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="name"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.input}
          textContentType="password"
          secureTextEntry={hidePass ? true : false}
        />
        <Ionicons
          size={20}
          style={styles.icon}
          name={hidePass ? "eye-off" : "eye"}
          color={Colors.light.tabIconDefault}
          onPress={() => setHidePass((prev) => (prev = !prev))}
        />
      </View>
      <Text style={{ color: "red" }}>{errors}</Text>
      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? "Signing In..." : "Sign In"}
      />
      <View style={{ alignItems: "center", marginVertical: 15 }}>
        <Link href="/signup">
          <Text style={styles.textBtn}>Create Account</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    position: "relative",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  textBtn: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  inputContainer: {
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    top: 15,
    right: 10,
  },
});

export default SignInScreen;
