import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ width = 24, height = 24, color = 'black' }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-1.44 1.44l.27.28v.79l5 5 1.5-1.5-5-5ZM10 16a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
        fill={color}
      />
    </Svg>
  );
};

export default SearchIcon;
