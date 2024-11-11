// src/navigation/navigationRef.js

import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

// Sử dụng createRef mà không khai báo kiểu dữ liệu
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
