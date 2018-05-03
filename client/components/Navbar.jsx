import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <nav >

  </nav>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {

  };
};

const mapDispatch = dispatch => {
  return {

  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// };
