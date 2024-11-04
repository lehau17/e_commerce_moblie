// ArrowIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowIcon = ({ width = 48, height = 48, color = "blue" }) => (
  <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
    {/* Mũi tên quay trái */}
    <Path
      d="M48 32H16M16 32L32 16M16 32L32 48" // Đường dẫn cho mũi tên quay trái
      fill="none" // Đặt fill là "none" để rỗng ruột
      stroke={color} // Màu viền
      strokeWidth={2} // Độ dày của đường viền
    />
  </Svg>
);

export default ArrowIcon;
