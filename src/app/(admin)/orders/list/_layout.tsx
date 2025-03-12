import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListTabNavigator() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <TopTabs>
        <TopTabs.Screen name='index' options={{ title: 'active' }} />
      </TopTabs>
    </SafeAreaView>
  );
}
