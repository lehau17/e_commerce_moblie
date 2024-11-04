import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const RightArrowIcon = ({ size = 20, color = 'black' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Path
        d="M8 32h48M32 8l24 24L32 56"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default RightArrowIcon