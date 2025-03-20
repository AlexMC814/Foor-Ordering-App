import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });

  if (data) {
    return data;
  }

  Alert.alert("Error fetching payment sheet params");
  return {};
};

export const initializePaymentSheet = async (amount: number) => {
  console.info(`Initializing payment sheet for $${amount}`);
  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );

  if (!paymentIntent || !publishableKey) {
    return;
  }

  await initPaymentSheet({
    merchantDisplayName: "Test shop",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "John Doe",
    },
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }

  return true;
};
