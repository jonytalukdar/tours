import React from 'react';

const Login = () => {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login">
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
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
