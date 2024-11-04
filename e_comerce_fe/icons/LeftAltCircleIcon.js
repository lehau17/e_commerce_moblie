// LeftAltCircleIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftAltCircleIcon = ({ width = 28, height = 28, color = "rgb(44, 169, 188)", strokeColor = "rgb(0, 0, 0)" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M3,12a9,9,0,1,0,9-9A9,9,0,0,0,3,12Zm9-2.59V10h4a1,1,0,0,1,1,1v2a1,1,0,0,1-1,1H12v.59a1,1,0,0,1-1.71.7L7.71,12.71a1,1,0,0,1,0-1.42l2.58-2.58A1,1,0,0,1,12,9.41Z"
      fill={color}
      strokeWidth={2}
      stroke={strokeColor}
    />
    <Path
      d="M12,9.41V10h4a1,1,0,0,1,1,1v2a1,1,0,0,1-1,1H12v.59a1,1,0,0,1-1.71.7L7.71,12.71a1,1,0,0,1,0-1.42l2.58-2.58A1,1,0,0,1,12,9.41ZM3,12a9,9,0,1,0,9-9A9,9,0,0,0,3,12Z"
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

export default LeftAltCircleIcon;
