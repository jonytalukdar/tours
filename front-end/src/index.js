import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
