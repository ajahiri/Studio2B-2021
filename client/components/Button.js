import React from 'react';
import styled from 'styled-components';

import { colours as C, typography as T } from '../constants';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => (props.secondary ? C.white : C.primary)};
  border-color: ${props => (props.secondary ? C.black : C.primary)};
  border-radius: 10px;
  border-width: 2px;
  padding: 15px;
`;

const ButtonText = styled.Text`
  align-self: center;
  color: ${props => (props.secondary ? C.black : C.white)};
  font-size: ${T.sizes.normal};
  font-weight: 700;
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
