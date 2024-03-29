import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Segment } from 'semantic-ui-react';
import { logOutThunk } from '../../store';
import { connect } from 'react-redux';

const Navbar = ({ handleClick, isLoggedIn, user, logout }) => {
  const admin = user && user.admin;
  return (
    <div style={{ background: 'black'}}>
      <Segment inverted>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Menu inverted>
              <img src='logo.svg' height="60px" width="120px" />
              <Menu.Item as={Link} to="/" name="Home" />
              <Menu.Item as={Link} to="/charts" name="Charts" />
              {admin ? (
                <Menu.Item as={Link} to="/admin-dash" name="Admin" />
              ) : null}
              <Menu.Menu position="right">
                <Dropdown text="Settings" className="link item">
                  <Dropdown.Menu>
                    <Dropdown.Item>My Account</Dropdown.Item>
                    <Dropdown.Item>Edit My Account</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Menu.Item type="click" name="Logout" onClick={logout} />
              </Menu.Menu>
            </Menu>
          </div>
        ) : (
            <Menu inverted>
              <img src='logo.svg' height="60px" width="120px" />
              {/* The navbar will show these links before you log in */}
              <Menu.Item as={Link} to="/" name="Home" />
              <Menu.Item as={Link} to="/charts" name="Charts" />
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

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  user: state.user.email
});

const mapDispatchToProps = dispatch => ({
  logout: () => logOutThunk()
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
