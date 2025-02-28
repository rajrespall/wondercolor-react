import React from 'react';

const Logo = ({ logo }) => (
  <img 
    src={logo} 
    alt="Logo" 
    style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: '80px',
    }} 
  />
);

export default Logo;