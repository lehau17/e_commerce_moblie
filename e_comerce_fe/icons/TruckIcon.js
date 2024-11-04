// TruckIcon.js
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const TruckIcon = ({ width = 28, height = 28, color = "blue" }) => (
  <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
    {/* Thân xe tải */}
    <Path
      d="M2 38V22h36v16H2z"
      fill="none" // Đặt fill là "none" để rỗng ruột
      stroke={color}
      strokeWidth={2}
    />
    
    {/* Cabin xe */}
    <Path
      d="M38 26h8l8 8v4H38v-12z"
      fill="none" // Đặt fill là "none" để rỗng ruột
      stroke={color}
      strokeWidth={2}
    />

    {/* Bánh xe trước */}
    <Circle cx={14} cy={46} r={4} fill="none" stroke={color} strokeWidth={2} />

    {/* Bánh xe sau */}
    <Circle cx={46} cy={46} r={4} fill="none" stroke={color} strokeWidth={2} />

    {/* Thân xe bên dưới */}
    <Path
      d="M2 38h44v4H2z"
      fill="none" // Đặt fill là "none" để rỗng ruột
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

export default TruckIcon;
