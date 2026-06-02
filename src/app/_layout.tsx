import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/global.css';
import { AppBottomSheet } from '@/shared/components/AppBottomSheet';
import { AppModal } from '@/shared/components/AppModal';
import ToastManager from 'toastify-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNotifications } from '@/shared/hooks/useNotifications';

const queryClient = new QueryClient();

export default function RootLayout() {

  useNotifications()

  return (
    <GestureHandlerRootView className='flex-1'>

      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(private)" />
        </Stack>
        <AppModal />
        <AppBottomSheet />
        <ToastManager />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
