import React from 'react';

import { Layout } from './components';
import { Switch, Route } from 'react-router-dom';
import { Login, Signup, TourDetails, Tours } from './pages';
import PrivateRoute from './pages/PrivateRoute';
import Account from './pages/Account';

const App = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact component={Tours} />

          <Route path="/login" component={Login} />

          <Route path="/signup" component={Signup} />

          <PrivateRoute>
            <Route path="/me" component={Account} />
          </PrivateRoute>

          <PrivateRoute>
            <Route path="/tour/:slug" component={TourDetails} />
          </PrivateRoute>
        </Switch>
      </Layout>
    </>
  );
};

export default App;
