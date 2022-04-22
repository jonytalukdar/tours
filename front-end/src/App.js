import React from 'react';

import { Layout } from './components';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Signup,
  TourDetails,
  Tours,
  Account,
  PrivateRoute,
} from './pages';

import Status from './utils/Status';

const App = () => {
  return (
    <>
      <Layout>
        <Status />
        <Switch>
          <Route exact path="/" component={Tours} />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <PrivateRoute>
            <Route exact path="/me" component={Account} />
            <Route exact path="/tour/:slug" component={TourDetails} />
          </PrivateRoute>
        </Switch>
      </Layout>
    </>
  );
};

export default App;
