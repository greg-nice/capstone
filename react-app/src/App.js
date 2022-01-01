import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar/SideBar.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import HomePage from './components/HomePage/HomePage.js';
import OnePlaylist from './components/OnePlaylist/';
import OneAlbum from './components/OneAlbum/OneAlbum.js';
import OneUser from './components/OneUser/OneUser.js';
import NowPlaying from './components/NowPlaying/NowPlaying.js';
import { authenticate } from './store/session';
import { getSuserPlaylists } from './store/playlists';
import { getSuserFollowedPlaylists } from './store/followedPlaylists';
import './App.css';
import Collections from './components/Collections';
import TeaserBar from './components/TeaserBar/TeaserBar';
import PlaylistsCollection from './components/PlaylistsCollection/PlaylistsCollection';

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  if (sessionUser) {
    // console.log(sessionUser);
    (async () => {
      await dispatch(getSuserPlaylists());
      await dispatch(getSuserFollowedPlaylists());
    })();
  }

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      // await dispatch(getSuserPlaylists());
      setLoaded(true);
    })();
  }, [dispatch]);


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <div className="top-container">
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <SideBar />
        {sessionUser && <NowPlaying />}
        {!sessionUser && <TeaserBar />}
        <div className="main-view">
          <NavBar />
          <Switch>


            {/* <ProtectedRoute path='/users' exact={true} >
              <UsersList/>
            </ProtectedRoute> */}
            {/* <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute> */}
            <Route path='/' exact={true} >
              <HomePage />
            </Route>
            <Route path='/playlists/:playlistId' exact={true}>
              <OnePlaylist />
            </Route>
            <Route path='/albums/:albumId' exact={true}>
              <OneAlbum />
            </Route>
            <Route path='/users/:userId' exact={true}>
              <OneUser />
            </Route>
            <ProtectedRoute path='/collections' exact={true}>
              <Collections />
            </ProtectedRoute>
            <ProtectedRoute path='/collections/playlists' exact={true}>
              <PlaylistsCollection />
            </ProtectedRoute>
            <Route path="/">
              <div>Page Not Found, 404</div>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
