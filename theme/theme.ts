import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const palette = {
  muted: '#C8C8C8',
  gray: '#878E96',
  blue: '#007AFF',
  darkGray: '#38434D',
  white: '#FFFFFF',
  almostBlack: '#141414',
  black: '#000000',
  purple: '#6366F1',
  primary: '#E24585',
  lightGray: '#F4F4FD',
  lightPrimary: '#F7D5E2',
};

const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    xs_4: 4,
    s_8: 8,
    sm_12: 12,
    m_16: 16,
    ml_24: 24,
    l_32: 32,
    xl_64: 64,
  },
  borderRadii: {
    s_3: 3,
    m_6: 6,
    l_12: 12,
    xl_24: 24,
    full_9999: 9999,
  },
  textVariants: {
    'regular/footnote': {
      fontFamily: 'Pretendard-Regular',
      fontSize: 13,
      lineHeight: 18,
    },
    'regular/callout': {
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      lineHeight: 21,
    },
    'bold/title1': {
      fontFamily: 'Pretendard-Bold',
      fontSize: 26,
      lineHeight: 36,
      color: 'almostBlack',
    },
    'bold/title2': {
      fontFamily: 'Pretendard-Bold',
      fontSize: 22,
      lineHeight: 28,
      color: 'almostBlack',
    },
    'bold/headline': {
      fontFamily: 'Pretendard-Bold',
      fontSize: 17,
      lineHeight: 22,
    },
    'bold/footnote': {
      fontFamily: 'Pretendard-Medium',
      fontSize: 13,
      lineHeight: 18,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
