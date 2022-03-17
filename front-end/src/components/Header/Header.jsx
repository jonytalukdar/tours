import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-white.png';

const Header = () => {
  return (
    <header class="header">
      <nav class="nav nav--tours">
        <Link to="/" class="nav__el">
          All tours
        </Link>
        {/* <form class="nav__search">
          <button class="nav__search-btn">
            <svg>
              <use href={img}></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            class="nav__search-input"
          />
        </form> */}
      </nav>
      <div class="header__logo">
        <Link to={'/'}>
          {' '}
          <img src={logo} alt="Natours logo" />
        </Link>
      </div>
      <nav class="nav nav--user">
        {/* <a href="#" class="nav__el">
          My bookings
        </a>
        <a href="#" class="nav__el">
          <img src="img/user.jpg" alt="User photo" class="nav__user-img" />
          <span>Jonas</span>
        </a> */}

        <Link to={'/login'} class="nav__el">
          Log in
        </Link>
        <Link to={'/signup'} class="nav__el nav__el--cta">
          Sign up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
