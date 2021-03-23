import React from 'react';
import styled from 'styled-components';

import { colours as C, layout as L, typography as T } from '../constants';

const ButtonContainer = styled.TouchableOpacity`
  border-radius: ${L.borderRadius}px;
  border-width: ${L.borderWidth}px;
  padding: ${L.defaultPadding}px;

  ${({ disabled, secondary }) => {
    if (disabled) {
      if (secondary) {
        return `
          background-color: ${C.white};
          border-color: ${C.grey};
        `;
      } else {
        return `
          background-color: ${C.primaryLight};
          border-color: ${C.primaryLight};
        `;
      }
    } else {
      if (secondary) {
        return `
          background-color: ${C.white};
          border-color: ${C.black};
        `;
      } else {
        return `
          background-color: ${C.primary};
          border-color: ${C.primary};
        `;
      }
    }
  }}
`;

const ButtonText = styled.Text`
  align-self: center;
  color: ${props => (props.secondary ? C.black : C.white)};
  font-size: ${T.sizes.normal}px;
  font-family: ${T.fonts.bold};
`;

export default function Button({
  text = '',
  secondary = false,
  disabled = false,
  ...props
}) {
  return (
    <ButtonContainer secondary={secondary} disabled={disabled} {...props}>
      <ButtonText secondary={secondary} disabled={disabled}>
        {text.toLocaleUpperCase('en-AU')}
      </ButtonText>
    </ButtonContainer>
  );
}
