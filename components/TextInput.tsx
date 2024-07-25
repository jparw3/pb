import React, { forwardRef } from 'react';
import { TextInput as RnTextInput, TextInputProps } from 'react-native';
import { makeStyles } from 'theme';

export const TextInput = forwardRef<RnTextInput, TextInputProps>((props, ref) => {
  const styles = useStyles();

  return <RnTextInput ref={ref} style={styles.textInput} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  textInput: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    lineHeight: 21,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.muted,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: theme.spacing.m_16,
  },
}));
