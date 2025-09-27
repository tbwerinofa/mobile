import SafeScreen from "@/components/SafeScreen";
import { AuthProvider } from "@/utils/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </AuthProvider>
    </QueryClientProvider>
  );
}
