import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import cookie from 'js-cookie';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = cookie.get('jwt');

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
        {user && token && (
          <>
            <a href="#" className="nav__el">
              <img
                src={`/img/users/${user.photo}`}
                alt=""
                className="nav__user-img"
              />
              <span>{user.name.split(' ')[0]}</span>
            </a>
            <button
              className="nav__el nav__el--cta"
              onClick={() => dispatch(logOut())}
            >
              Logout
            </button>
          </>
        )}

        {!user && !token && (
          <>
            <Link to={'/login'} className="nav__el">
              Log in
            </Link>
            <Link to={'/signup'} className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
