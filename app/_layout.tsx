import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { theme } from 'theme';

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack />
    </ThemeProvider>
  );
}
