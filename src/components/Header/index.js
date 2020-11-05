import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({ categories }) => (
  <header className="menu">
    <nav>
      {categories.map(({ route, label }) => (
        <NavLink
          exact
          to={route}
          key={label}
          className="menu-link"
          activeClassName="menu-link--active"
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Header;
