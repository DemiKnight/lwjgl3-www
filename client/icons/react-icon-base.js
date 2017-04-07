import React from 'react';

// https://github.com/gorangajic/react-icons/tree/master/fa

const Icon = ({ children, size, ...props }) => (
  <span className="svg-icon" style={{ fontSize: size }}>
    <svg children={children} fill="currentColor" preserveAspectRatio="xMidYMid meet" {...props} />
  </span>
);

export default Icon;
