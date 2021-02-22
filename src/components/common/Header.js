import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: '#F15B2A' };
  return (
    <nav>
      <NavLink to='/' activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {' | '}
      <NavLink to='/stock' activeStyle={activeStyle}>
        Stock Page
      </NavLink>
    </nav>
  );
};

export default Header;
