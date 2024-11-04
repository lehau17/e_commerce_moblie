import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const StarIcon = ({ size = 24, color = 'gold' }) => {
  const points = `
    M12 2
    L15 8
    L22 9
    L17 14
    L18 21
    L12 17
    L6 21
    L7 14
    L2 9
    L9 8
    Z
  `;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={points} fill={color} />
    </Svg>
  );
};

export default StarIcon