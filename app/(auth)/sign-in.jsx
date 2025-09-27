import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { authStyles } from "../../assets/styles/auth.styles.js";
import { COLORS } from "../../constants/colors.js";
import { AuthContext } from "../../utils/authContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

export default function Page() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  //const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Handle the submission of the sign-in form
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "" },
    onSubmit: (values) => FormSubmit(),
  });

  function FormSubmit() {
    authContext.logIn(email, password);
  }

  const handleSubmitLegacy = async () => {
    authContext.logIn(email, password);
    /*
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "SignIn failed please try again");
      }
    } catch (err) {
      Alert.alert("Error", err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <form>
      <View style={authStyles.container}>
        <KeyboardAvoidingView
          style={authStyles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView
            contentContainerStyle={authStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={authStyles.imageContainer}>
              <Image
                source={require("../../assets/images/ipisillustration.jpg")}
                style={authStyles.image}
                contentFit="contain"
              />
            </View>
            <Text style={authStyles.title}>Welcome Back</Text>
            {/* Form Container */}

            <View style={authStyles.formContainer}>
              {/* Email Input */}
              <View style={authStyles.inputContainer}>
                <TextInput
                  style={authStyles.textInput}
                  placeholder="Enter email"
                  placeholderTextColor={COLORS.textLight}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* PASSWORD INPUT */}
              <View style={authStyles.inputContainer}>
                <TextInput
                  style={authStyles.textInput}
                  placeholder="Enter password"
                  placeholderTextColor={COLORS.textLight}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.textLight}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    authStyles.authButton,
                    loading && authStyles.buttonDisabled,
                  ]}
                  onPress={handleSubmitLegacy}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={authStyles.buttonText}>
                    {loading ? "Signing In..." : "Sign In"}
                  </Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <TouchableOpacity
                  style={authStyles.linkContainer}
                  onPress={() => router.push("/(auth)/sign-up")}
                >
                  <Text style={authStyles.linkText}>
                    Don&apos;t have an account?{" "}
                    <Text style={authStyles.link}>Sign up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </form>
  );
}
