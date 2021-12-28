
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import { login } from '../store/session';
import ProfileButton from './ProfileButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = 'password';

    return dispatch(login(email, password));
  }



  

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser}/>
        {/* <LogoutButton /> */}
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div id="login-buttons-group">
          <button id="demo-button"><span id="demo-span" onClick={handleClick}>Demo</span></button>
          <button id="signup-button">
            <NavLink id="signup-link" to='/sign-up' exact={true}>
              Sign Up
            </NavLink>
          </button>
          <button id="login-button">
            <NavLink id="login-link" to='/login' exact={true}>
              Log In
            </NavLink>
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="top-bar">
      <header className="top-bar-and-user-menu">
        <div>
          <NavLink className='nav-link' id="users-link" to='/users' exact={true}>
            Users
          </NavLink>
        </div>
        <div>
          {sessionLinks}
        </div>
      </header>
    </div>
  );
}

export default NavBar;
