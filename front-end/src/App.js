import React from 'react';

import { Layout } from './components';
import { Switch, Route } from 'react-router-dom';
import { Login, Signup, TourDetails, Tours } from './pages';

const App = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact component={Tours} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/tour/:slug" component={TourDetails} />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
