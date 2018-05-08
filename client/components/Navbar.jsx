import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <nav>
   

    <Link to="/">
    Home
    </Link>
    { isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <a href="#" onClick={handleClick}>
           Logout
        </a>
        <Link to="/account">
           My Account
        </Link>
        <a>Welcome, insert name here!</a>
        <Link to="/timelines">
           Create a New Timeline
        </Link>
        <Link to="/saved-timelines">
           Saved Timelines
        </Link>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
        <Link to="/login">
          Login
        </Link>
        <Link to="register">
          Register
        </Link>
        <hr />
      </div>
    )
    }
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
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};


// <header>
//   <div className="logo">
//     <img src="/images/logo.png" width="200" height="160" />
//   </div>
//   <nav>
//     {isLoggedIn ? (
//       <div>
//         {/* The navbar will show these links after you log in */
//         <a href="#" onClick={handleClick} className="btn btn-danger">
//         Logout
//         </a>
//         <Link to="/account" className="btn btn-primary">
//         My Account
//         </Link>
//         <a>Welcome, {user.firstName}!</a>
//       </div>
//     ) : (
//       <div>
// {/* The navbar will show these links before you log in */
//         <Link to="/login" className="btn btn-success">
//         Login
//         </Link>
//         <Link to="/signup" className="btn btn-danger">
//         Sign Up
//         </Link>
//       </div>
//     )}
//     <Link to="/cart" className="btn btn-warning">
//     Go To Cart
//     </Link>
//   </nav>
// </header>
