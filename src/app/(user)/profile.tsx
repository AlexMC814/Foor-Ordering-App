import { supabase } from "@/src/lib/supabase";
import { View, StyleSheet } from "react-native";
import Button from "@components/Button";

const ProfileScreen = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button text="Sign Out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
});

export default ProfileScreen;
