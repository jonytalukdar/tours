import React from 'react';
import logo from '../../assets/img/logo-green.png';

const Footer = () => {
  return (
    <div class="footer">
      <div class="footer__logo">
        <img src={logo} alt="Natours logo" />
      </div>
      <ul class="footer__nav">
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Download apps</a>
        </li>
        <li>
          <a href="#">Become a guide</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <p class="footer__copyright">&copy; Jony. All rights reserved.</p>
    </div>
  );
};

export default Footer;
