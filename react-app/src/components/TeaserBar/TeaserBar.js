// import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// Link to = {`/playlists/${playlist.id}`} ??
import React from 'react';
import './TeaserBar.css'



export default function TeaserBar() {
    const history = useHistory();
    
    const handleBarClick = () => {
        history.push("/sign-up");
    }

    return (
        <div className="now-playing-bar">
            <footer className="teaser-bar-component">
                <div className="teaser-bar-inner-wrapper" onClick={handleBarClick}>
                    <div className="teaser-message-container">
                        <p className="message-heading">Preview of BOOMBOX</p>
                        <p className="message-body">Sign up to play songs, make playlists, and follow other music fans.</p>
                    </div>
                    <Link to="/sign-up"><button className="teaser-signup-button">
                        Sign up
                    </button></Link>
                </div>
            </footer>
        </div>
    )
}