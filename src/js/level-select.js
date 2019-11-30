import '../scss/style.scss';
import {toggleProfile, arrayBufferToBase64} from './support/utils.js'
import Swal from "sweetalert2";
import React from 'react';
import ReactDOM from 'react-dom';
import NavProfile from './support/nav-profile.jsx';

function init() {

    ReactDOM.render( <NavProfile /> , document.querySelector('#app'));

    document.querySelectorAll('.locked-level').forEach(el => {
        el.onclick = e => {
            e.preventDefault();
            Swal.fire('This level is locked. Upgrade to Hacker Status to access it!');
        };
    });


    fetch('/retrieve')
    .then(res => res.text())
    .then(data => {
        document.querySelectorAll('.profile-img').forEach(el => {
            el.src = data;
        });
    });

}

window.onload = init;