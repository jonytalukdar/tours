import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin } from '../services';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signin({ userData: { email, password }, history }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group ma-btn-md">
            <label htmlFor="password" className="form__label">
              Your Password
            </label>
            <input
              id="password"
              type="password"
              className="form__input"
              placeholder="....."
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button
              type="submit"
              // disabled={isLoading}
              className="btn btn--green"
            >
              {/* {isLoading ? 'Loading... ' : ' Login'} */}
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
