import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="loginPadre" options={{ headerShown: false }} />
      <Stack.Screen name="loginEstudiante" options={{ headerShown: false }} />
      <Stack.Screen name="loginProfesor" options={{ headerShown: false }} />
      <Stack.Screen name="inicio" options={{ headerShown: false }} />
      <Stack.Screen name="roles" options={{ headerShown: false }} />
    </Stack>
  );
}
