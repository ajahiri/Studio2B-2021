import * as color from './color';

export const size = {
  h1: 60,
  h2: 30,
  h3: 25,
  h4: 20,
  lg: 18,
  md: 16,
  sm: 14,
  xs: 12,
};

const defaultTextStyles = {
  color: color.black,
};

export const h1 = {
  ...defaultTextStyles,
  fontSize: size.h1,
  fontWeight: '700',
};

export const h2 = {
  ...defaultTextStyles,
  fontSize: size.h2,
  fontWeight: '700',
};

export const h3 = {
  ...defaultTextStyles,
  fontSize: size.h3,
  fontWeight: '300',
};

export const h4 = {
  ...defaultTextStyles,
  fontSize: size.h4,
};

export const body = {
  ...defaultTextStyles,
  fontSize: size.md,
};
