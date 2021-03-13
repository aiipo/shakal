import React from 'react';
import { Link } from 'react-router-dom';
import { ROOT_ROUTE } from '../../constants/routes';
import './header.scss';

const Header = () => (
  <header className="header">
    <div className="wrapper">
      <Link to={ROOT_ROUTE}>
        <h1>Shakal</h1>
      </Link>
    </div>
  </header>
);

export default Header;
