import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { PALETTE } from '@/config/theme.config';
import { queryClient } from '@/lib/queryClient';
import { router } from '@/router';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            backgroundColor: PALETTE.darkCoffee,
            borderColor: PALETTE.camel,
            color: PALETTE.creamText,
            borderRadius: '1rem',
          },
        }}
      />
    </QueryClientProvider>
  );
}
