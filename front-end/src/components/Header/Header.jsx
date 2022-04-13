import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-white.png';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
        {/* <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use href={img}></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form> */}
      </nav>
      <div className="header__logo">
        <Link to={'/'}>
          {' '}
          <img src={logo} alt="Natours logo" />
        </Link>
      </div>
      <nav className="nav nav--user">
        {/* <a href="#" className="nav__el">
            <img
              src={`/img/users/${user.photo}`}
              alt="User photo"
              className="nav__user-img"
            />
            <span>{user.name.split(' ')[0]}</span>
          </a> */}

        <Link to={'/login'} className="nav__el">
          Log in
        </Link>
        <Link to={'/signup'} className="nav__el nav__el--cta">
          Sign up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
