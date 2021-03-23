import React from 'react';
import styled from 'styled-components';

import { colours as C, layout as L, typography as T } from '../constants';

const StyledTextInput = styled.TextInput`
  background-color: ${C.white};
  border-color: ${C.black};
  border-radius: ${L.borderRadius}px;
  border-width: ${L.borderWidth}px;
  font-size: ${T.sizes.normal}px;
  padding: 15px;
`;

export default function TextInput({
  placeholder = 'Enter some text',
  disabled = false,
  ...props
}) {
  return (
    <StyledTextInput placeholder={placeholder} disabled={disabled} {...props} />
  );
}
