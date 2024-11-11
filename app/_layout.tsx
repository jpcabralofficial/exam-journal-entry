/** @format */
import { QueryClient, QueryClientProvider } from 'react-query';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import '@/global.css';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlowProvider } from '@/context/FlowContext';
import 'react-native-get-random-values';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
console.warn = () => '';
console.error = () => '';
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView className='flex-1'>
      <QueryClientProvider client={queryClient}>
        <FlowProvider>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Stack
            screenOptions={{ headerShown: false }}
            initialRouteName={'/(Onboarding)/index'}>
            <Stack.Screen name={'/(Onboarding)/index'} />
            <Stack.Screen name={'/JournalEntry'} />
            <Stack.Screen name={'JournalEntry/CreateEntry'} />
          </Stack>
        </FlowProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
