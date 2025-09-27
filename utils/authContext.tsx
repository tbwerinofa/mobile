import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import config from "../utils/config";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  userToken: string;
  userInfo: string;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  userToken: "",
  userInfo: "",
  logIn: () => {},
  logOut: () => {},
});

const authStorageKey = "auth-key";

export function AuthProvider({ children }: PropsWithChildren) {
  const [userToken, setUserToken] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const storeAuthState = async (newState: {
    isLoggedIn: boolean;
    token: string;
  }) => {
    try {
      if (isLoggedIn) {
        const jsonValue = JSON.stringify(newState);
        await AsyncStorage.setItem(authStorageKey, jsonValue);
        await AsyncStorage.setItem("userToken", newState.token);
      } else {
        //AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem(authStorageKey);
      }
    } catch (error) {
      console.log("Error saving", error);
    }
  };

  const logIn = (email: string, password: string) => {
    axios
      .post(
        `${config.baseApiUrl}/token`,
        {
          username: email,
          password: password,
          grant_type: "password",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        let token = res.data["access_token"];
        let userInfo = res.data;
        setIsLoggedIn(true);
        setUserInfo(userInfo);
        setUserToken(token);
        storeAuthState({ isLoggedIn: true, token: token });
        router.replace("/");
      })
      .catch((err) => {
        console.log(`login error ${err}`);
        //setIsLoading(false);
      });
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserToken("");
    storeAuthState({ isLoggedIn: false, token: userToken });
    router.replace("/sign-in");
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      // simulate a delay, e.g. for an API request
      await new Promise((res) => setTimeout(() => res(null), 1000));
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.log("Error fetching from storage", error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        userToken,
        userInfo,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
