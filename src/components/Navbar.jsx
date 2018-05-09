import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Segment } from 'semantic-ui-react';
// import { logout } from '../store';

export const Navbar = ({ handleClick, isLoggedIn, user }) => {
  const admin = user && user.admin;
  return (
    <div>
      <Segment inverted>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Menu inverted>
              <Menu.Item as={Link} to="/" name="Home" />
              <Menu.Item as={Link} to="/timelines" name="Timelines" />
              {admin ? <Menu.Item as={Link} to="/admin-dash" name="Admin" /> : null}
              <Menu.Menu position="right">
                <Dropdown text="Settings" className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>My Account</Dropdown.Item>
                    <Dropdown.Item>Edit My Account</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Menu.Item name="Logout" />
              </Menu.Menu>
            </Menu>
          </div>
        ) : (
            <Menu inverted>
              {/* The navbar will show these links before you log in */}
              <Menu.Item as={Link} to="/" name="Home" />
              <Menu.Item as={Link} to="/timelines" name="Timelines" />
              <Menu.Menu position="right">
                <Menu.Item as={Link} to="/login" name="Login" />
                <Menu.Item as={Link} to="signup" name="Signup" />
              </Menu.Menu>
            </Menu>
          )}
      </Segment>
    </div>
  );
};
