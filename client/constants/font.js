import * as color from './color';

export const size = {
  title: 64,
  h1: 48,
  h2: 36,
  h3: 24,
  lg: 18,
  md: 16,
  sm: 14,
  xs: 12,
};

export const fontFamily = {
  regular: 'Montserrat_400Regular',
  bold: 'Montserrat_700Bold',
};

const defaultTextStyles = {
  color: color.black,
};

export const title = {
  ...defaultTextStyles,
  fontSize: size.title,
  fontFamily: fontFamily.bold,
};

export const h1 = {
  ...defaultTextStyles,
  fontSize: size.h1,
  fontFamily: fontFamily.bold,
};

export const h2 = {
  ...defaultTextStyles,
  fontSize: size.h2,
  fontFamily: fontFamily.bold,
};

export const h3 = {
  ...defaultTextStyles,
  fontSize: size.h3,
  fontFamily: fontFamily.bold,
};

export const large = {
  ...defaultTextStyles,
  fontSize: size.lg,
  fontFamily: fontFamily.regular,
};

export const largeBold = {
  ...large,
  fontFamily: fontFamily.bold,
};

export const medium = {
  ...defaultTextStyles,
  fontSize: size.md,
  fontFamily: fontFamily.regular,
};

export const mediumBold = {
  ...medium,
  fontFamily: fontFamily.bold,
};

export const small = {
  ...defaultTextStyles,
  fontSize: size.sm,
  fontFamily: fontFamily.regular,
};

export const smallBold = {
  ...small,
  fontFamily: fontFamily.bold,
};
