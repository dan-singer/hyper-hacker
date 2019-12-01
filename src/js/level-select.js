import '../scss/style.scss';
import {toggleProfile, arrayBufferToBase64} from './support/utils.js'
import Swal from "sweetalert2";
import React from 'react';
import ReactDOM from 'react-dom';
import NavProfile from './support/nav-profile.jsx';
import LevelContainer from './support/level-container.jsx'

function init() {

    fetch('/level-select-details')
    .then(res => res.json())
    .then(data => {
        ReactDOM.render( 
        <React.Fragment>
            <NavProfile 
                csrf={data.csrfToken}
                username={data.username}
                dateJoined={data.dateJoined}
                isPremium={data.isPremium}
                profilePic={data.profilePic}  />
            <LevelContainer
                levels={data.levels}
                isPremium={data.isPremium}
                highscores={data.highscores} 
            />
        </React.Fragment>
,
        document.querySelector('#app'));
    });
}

window.onload = init;