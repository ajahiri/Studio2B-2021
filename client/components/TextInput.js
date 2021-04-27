// import React from 'react';
import styled from 'styled-components/native';

import { color, font, layout } from '../constants';

const TextInput = styled.TextInput`
  height: 52px;
  background-color: ${color.white};
  border-color: ${props => (props.error ? color.error : color.lightGray)};
  border-radius: ${layout.radius.md}px;
  border-width: ${layout.border.thick}px;
  padding: ${layout.spacing.md}px;
  font-family: ${font.fontFamily.medium};
  font-size: ${font.size.md}px;
`;

export default TextInput;
