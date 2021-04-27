import React from 'react';
import styled from 'styled-components/native';

import { layout as L, typography as T } from '../constants';

const Heading = styled.Text`
  font-family: ${T.fonts.bold};
  font-size: ${T.sizes.heading}px;
`;

export default Heading;
