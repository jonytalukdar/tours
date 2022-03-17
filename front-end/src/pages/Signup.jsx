import React from 'react';

const Signup = () => {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create an account</h2>
        <form className="form form--login">
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              className="form__input"
              placeholder="Enter Your Name"
              required
            />
          </div>
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
          <div className="form__group ma-btn-md">
            <label htmlFor="confirmPassword" className="form__label">
              Confirm Your Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form__input"
              placeholder="....."
              required
              minLength={8}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Signup</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
