import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { ROOT_ROUTE } from '../../constants/routes';

const Header = () => (
  <header className="header">
    <div className="wrapper header__wrapper">
      <Link to={ROOT_ROUTE}>
        <h1>Shakal</h1>
      </Link>
    </div>
  </header>
);

export default Header;
