import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export default function AuthRoutesLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) return null;

  if (authState.isLoggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
