import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
  const token = cookie.get('jwt');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
