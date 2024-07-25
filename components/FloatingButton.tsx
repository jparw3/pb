import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text, makeStyles } from 'theme';

import { PressableScale } from './PressableScale';

type FloatingButtonProps = {
  title?: string;
  onPress?: () => void;
  children: React.ReactNode;
} & TouchableOpacityProps;

export const FloatingButton = forwardRef<TouchableOpacity, FloatingButtonProps>(
  ({ title, onPress, children, ...touchableProps }, ref) => {
    const styles = useStyles();

    return (
      <PressableScale style={styles.button} onPress={onPress}>
        {children}
      </PressableScale>
    );
  }
);

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: theme.spacing.xl_64,
    height: theme.spacing.xl_64,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadii.full_9999,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.spacing.m_16,
    shadowColor: theme.colors.almostBlack,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}));
